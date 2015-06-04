/**
 * Created by alexbol on 2/9/2015.
 */
define(['models/app', 'models/palabra', 'collections/categories', 'collections/quizItems'],
    function (app, Palabra, Categories, QuizItems) {
        var self;
        var Quiz = Backbone.Model.extend({
            /*className: "Quiz",*/
            defaults: {
                dictionary : "",
                categories : null,
                quizItems : null,
                started: false,
                selectedCategory: "",
                mode: "Edit",
                /*forceRefresh: false,*/
                sound: "on",
                numWeeksBefore: 2
            },
            initialize: function() {
                self = this;
                this.set("categories", new Categories());
                // Restore state from local storage
                this.restoreState();
                // app.on("change:currentDictionary", this.start, this);
                this.on("change:selectedCategory", this.retrieveItems, this);
                this.on("change:numWeeksBefore", this.retrieveItems, this);
                // this.on("change:forceRefresh", this.forceRefresh, this);
                this.on("change:mode", function() {
                    localStorage.mode = this.get("mode");
                }, this);
            },
            // on quiz selected start to create stuff
            start: function(category) {
                Palabra.prototype.className = app.get("currentDictionary");
                this.set("quizItems", new QuizItems());

                /* Fetching categories may take time, do not
                 wait for its termination, read them first from local storage
                 and render view, then proceed with categories in background
                  */
                this.restoreCategories();
                this.setSelectedCategory(category);

                this.get("categories").on("ready", this.categoriesSynced, this);
                this.get("categories").sync(this.get("numWeeksBefore"));

                // this.set("mode", "Play");
            },
            saveState: function() {
                if (window.localStorage) {
                    localStorage.currentDictionary = this.get("currentDictionary");
                    localStorage.selectedCategory = this.get("selectedCategory");
                    localStorage.numWeeksBefore = this.get("numWeeksBefore");
                    localStorage.sound = this.get("sound");
                    localStorage.mode = this.get("mode");
                }
            },
            restoreState: function() {
                if (window.localStorage) {
                    this.set("numWeeksBefore", localStorage.numWeeksBefore || this.get("numWeeksBefore"));
                    this.set("sound", localStorage.sound || this.get("sound"));
                    this.set("mode", localStorage.mode || this.get("mode"));
                }
            },
            saveCategories: function() {
                if (window.localStorage) {
                    var categoriesArray = [];
                    this.get("categories").forEach(function (model) {
                        categoriesArray.push({
                            "category" : model.get("category"),
                            "count" : model.get("count")
                        })
                    });
                    localStorage.setItem('categories', JSON.stringify(categoriesArray));
                }
            },
            restoreCategories: function() {
                if (window.localStorage) {
                    var categoriesItem = localStorage.getItem('categories');
                    var categoriesArray = JSON.parse(categoriesItem);
                    this.get('categories').reset();
                    this.get('categories').add(categoriesArray);
                }
            },
            // on categories sync'ed, save them in local storage
            categoriesSynced: function() {
                if (window.localStorage) {
                    this.saveCategories();
                }
                this.setSelectedCategory();
            },
            // on categories sync'ed, set first category as selected category
            // it will trigger retrieveItems
            setSelectedCategory: function(category) {
                // 1st option: set to category parameter if defined (on route path match)
                if (category != undefined) {
                    this.set("selectedCategory", category);
                }
                else {
                    // 2nd option: restore from local storage (on refresh)
                    if (window.localStorage && localStorage.selectedCategory) {
                        this.set("selectedCategory", localStorage.selectedCategory);
                    }
                    // 3d option: take the first in the list of categories (on the first entrance)
                    else {
                        var firstCategory = this.get("categories").at(0);
                        var selectedCategoryName = firstCategory.get("category");
                        this.set("selectedCategory", selectedCategoryName);
                    }
                }
            },
            // fetch items, then trigger ready to start QuizView
            retrieveItems: function() {
                var category = this.get("selectedCategory");
                var mode = this.get("mode");
                var numWeeksBefore = this.get("numWeeksBefore");
                this.get("quizItems").off();
                this.get("quizItems").on("sync", function() {

                    // Update category counter
                    this.updateSelectedCategoryCounter();

                    self.trigger("ready");
                }, this);
                this.get("quizItems").sync(category, numWeeksBefore);
            },

            // called when item added or item changed and we want to refresh view
            // forceRefresh: function() {
                // this.set("forceRefresh", false);
               // this.retrieveItems();
            // },

            triggerMatch: function() {
                this.trigger("match");
            },
            addEmptyItem: function() {
                var item = new Palabra();

                if (this.get("selectedCategory") != "All") {
                    item.set("category", this.get("selectedCategory"));
                }

                item.on("added", function(item) {
                    // add empty item to the list of quiz items
                    var quizItems = self.get("quizItems");
                    quizItems.add(item, {at: 0});
                    // update counter
                    this.updateSelectedCategoryCounter();
                    // this cause view rendering
                    self.trigger("ready");
                }, this);

                item.addToParse();       // save to cloud and trigger event "added" on success
            },
            deleteItem: function(item) {
                if (item != undefined) {
                    var quizItems = this.get("quizItems");
                    item.on("destroyed", function (item) {
                        quizItems.remove(item);
                        self.updateSelectedCategoryCounter();
                        // this cause view rendering
                        self.trigger("ready");
                    }, this);
                    item.deleteFromParse();
                }
            },
            itemUpdateCategory: function(item, oldCategory, newCategory) {
                if (item != undefined) {
                    var quizItems = this.get("quizItems");

                    item.on("updated", function(item) {
                        if (self.get("selectedCategory") == "All") {
                            self.updateOtherCategoryCounter(oldCategory, -1);
                            self.updateOtherCategoryCounter(newCategory, 1);
                        }
                        else {
                            quizItems.remove(item);
                            self.updateSelectedCategoryCounter();
                        }

                        // this cause view rendering
                        self.trigger("ready");
                    }, this);

                    item.set('category', newCategory);
                    item.updateParse();
                }
            },
            sortItems: function() {
                // update comparator function
                this.get("quizItems").comparator = function(model) {
                    return model.get('spanish');
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
