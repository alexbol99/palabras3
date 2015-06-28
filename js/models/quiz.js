/**
 * Created by alexbol on 2/9/2015.
 * This model is responsible on quiz data and quiz configuration
 */
define(['models/app', 'models/quizItem', 'models/category',
        'collections/categories', 'collections/quizItems'],
    function (app, QuizItem, Category, Categories, QuizItems) {

        var Quiz = Backbone.Model.extend({
            defaults: {
                categories : null,
                quizItems : null,
                selectedCategory: "",
                mode: "Edit",
                sound: "on",
                numWeeksBefore: 2,
                selectionMode: 'all',
                language1: null,
                language2: null
            },
            initialize: function() {
                this.on("change:mode", function() {
                    localStorage.mode = this.get("mode");
                }, this);
            },

            // on quiz selected start to create stuff
            start: function() {

                this.set("quizItems", new QuizItems());
                this.set("categories", new Categories());

                this.set("language1", app.get('currentDictionary').get('language1'));
                this.set("language2", app.get('currentDictionary').get('language2'));

                this.restoreCategories();

                if (this.get("selectedCategory") == "") {
                    this.setSelectedCategory();
                }

                /* Start to fetch categories */
                this.get("categories").on("ready", this.categoriesSynced, this);
                this.get("categories").sync();

                /* Start to retrieve items, on ready initialize view */
                this.retrieveItems();
            },
            saveState: function() {
                if (window.localStorage) {
                    // localStorage.currentDictionary = this.get("currentDictionary");
                    // localStorage.selectedCategory = this.get("selectedCategory");
                    // localStorage.numWeeksBefore = this.get("numWeeksBefore");
                    localStorage.sound = this.get("sound");
                    localStorage.mode = this.get("mode");
                    // localStorage.selectionMode = this.get("selectionMode");
                }
            },
            restoreState: function() {
                if (window.localStorage) {
                    // this.set("numWeeksBefore", localStorage.numWeeksBefore || this.get("numWeeksBefore"));
                    this.set("sound", localStorage.sound || this.get("sound"));
                    this.set("mode", localStorage.mode || this.get("mode"));
                    // this.set("selectionMode", localStorage.selectionMode || this.get("selectionMode"));
                }
            },
            saveCategories: function() {
                if (window.localStorage) {
                    var categoriesArray = [];
                    this.get("categories").forEach(function (model) {
                        categoriesArray.push({
                            "category_id" : model.get("category_id"),
                            "category" : model.get("category"),
                            "count" : model.get("count")
                        })
                    });
                    localStorage.setItem('categories', JSON.stringify(categoriesArray));
                }
            },
            restoreCategories: function() {
                //if (window.localStorage) {
                //    var categoriesItem = localStorage.getItem('categories');
                //    var categoriesArray = JSON.parse(categoriesItem);
                //    this.get('categories').reset();
                //    this.get('categories').add(categoriesArray);
                //}
            },
            // on categories sync'ed, save them in local storage
            categoriesSynced: function() {
                //if (window.localStorage) {
                //    this.saveCategories();
                //}
                if (this.get('categories') == null || this.get('categories').length == 0) {
                    this.set('selectedCategory', '');
                }
            },
            setSelectedCategory: function() {
                // 1st option: restore from local storage (on refresh)
                //if (window.localStorage && localStorage.selectedCategory) {
                //    this.set("selectedCategory", localStorage.selectedCategory);
                //}
                // 2nd option: take the first in the list of categories (on the first entrance)
                // else {
                    if (this.get("categories").length > 0) {
                        var firstCategory = this.get("categories").at(0);
                        var selectedCategoryName = firstCategory.get("category");
                        this.set("selectedCategory", selectedCategoryName);
                    }
                // }
            },
            // fetch items, then trigger ready to start QuizView
            retrieveItems: function() {
                var selectionMode = this.get("selectionMode");
                var category = this.get("selectedCategory");
                var numWeeksBefore = this.get("numWeeksBefore");
                var orderedBy = this.get('language1').get('name');

                this.get("quizItems").off();
                this.get("quizItems").on("sync", function() {

                    // Update category counter
                    this.updateSelectedCategoryCounter();

                    this.trigger("ready");
                }, this);

                this.get("quizItems").sync(selectionMode, category, numWeeksBefore, orderedBy);
            },

            addEmptyItem: function() {
                var item = new QuizItem();
                var selectedCategory = this.get('categories').findWhere({"category": this.get('selectedCategory')});
                if (selectedCategory) {
                    item.set({
                        category_id: selectedCategory.get('category_id'),
                        category: selectedCategory.get('category')
                    });
                }

                var dictionary = app.get("currentDictionary");
                var language1 = dictionary.get('language1').get('name');
                var language2 = dictionary.get('language2').get('name');
                // http://stackoverflow.com/questions/9640253/how-to-set-a-dynamic-property-on-a-model-with-backbone-js
                var map = {};
                map[language1] = '';
                map[language2] = '';
                item.set(map);

                //item.set({
                //    language1: '',
                //    language2: ''
                //});

                item.on("added", function(item) {
                    // add empty item to the list of quiz items
                    var quizItems = this.get("quizItems");
                    quizItems.add(item, {at: 0});
                    // update counter
                    this.updateSelectedCategoryCounter();
                    // this cause view rendering
                    this.trigger("ready");
                }, this);

                item.addToParse();       // save to cloud and trigger event "added" on success
            },
            deleteItem: function(item) {
                if (item != undefined) {
                    var quizItems = this.get("quizItems");
                    item.on("destroyed", function (item) {
                        quizItems.remove(item);
                        this.updateSelectedCategoryCounter();
                        // this cause view rendering
                        this.trigger("ready");
                    }, this);
                    item.deleteFromParse();
                }
            },
            itemUpdateCategory: function(item, oldCategory, newCategory) {
                if (item != undefined) {
                    var quizItems = this.get("quizItems");

                    item.on("updated", function(item) {
                        if (this.get("selectionMode") == "all") {
                            this.updateOtherCategoryCounter(oldCategory, -1);
                            this.updateOtherCategoryCounter(newCategory, 1);
                        }
                        else {
                            quizItems.remove(item);
                            this.updateSelectedCategoryCounter();
                        }

                        // this cause view rendering
                        this.trigger("ready");
                    }, this);

                    item.set('category', newCategory);
                    item.updateParse();
                }
            },
            sortItems: function() {    // meanwhile not in use
                // update comparator function
                var lang = app.get("currentDictionary").get("language1").get("name");
                this.get("quizItems").comparator = function(model) {
                    return model.get(lang);          // 'spanish');
                };
                // call the sort method
                this.get("quizItems").sort();
            },
            updateSelectedCategoryCounter: function() {
                var selectedCategoryName = this.get("selectedCategory");
                var selectedCategory = this.get("categories").findWhere({"category": selectedCategoryName});
                if (selectedCategory) {
                    selectedCategory.set("count", this.get("quizItems").length);
                }
            },
            updateOtherCategoryCounter: function( categoryName, delta) {
                var category = this.get("categories").findWhere({"category": categoryName});
                if (category) {
                    category.set("count", category.get("count") + delta);
                }
            }
        });
        return new Quiz();
    });
