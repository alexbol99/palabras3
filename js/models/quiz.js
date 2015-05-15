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
                mode: "",
                forceRefresh: false,
                sound: true,
                numWeeksBefore: 2
            },
            initialize: function() {
                self = this;
                this.restoreState();
                app.on("change:currentDictionary", this.start, this);
                this.on("change:selectedCategory", this.retrieveItems, this);
                this.on("change:numWeeksBefore", this.retrieveItems, this);
                this.on("change:forceRefresh", this.forceRefresh, this);
            },
            // on quiz selected start to create stuff
            start: function() {
                Palabra.prototype.className = app.get("currentDictionary");
                this.set("categories", new Categories());
                this.set("quizItems", new QuizItems());
                this.get("categories").on("ready", this.setSelectedCategory, this);

                this.get("categories").sync(this.get("numWeeksBefore"));

                this.set("mode", "Play");
            },
            saveState: function() {
                if (window.localStorage) {
                    localStorage.currentDictionary = this.get("currentDictionary");
                    localStorage.selectedCategory = this.get("selectedCategory");
                    localStorage.numWeeksBefore = this.get("numWeeksBefore");
                    localStorage.sound = this.get("sound");
                }
            },
            restoreState: function() {
                if (window.localStorage) {
                    this.set("numWeeksBefore", localStorage.numWeeksBefore || this.get("numWeeksBefore"));
                    this.set("sound", localStorage.sound || this.get("sound"));
                }
            },
            // on categories sync'ed, set first category as selected category
            // it will trigger retrieveItems
            setSelectedCategory: function() {
                if (window.localStorage && localStorage.selectedCategory) {
                    this.set("selectedCategory", localStorage.selectedCategory);
                }
                else {
                    var firstCategory = this.get("categories").at(0);
                    var selectedCategoryName = firstCategory.get("category");
                    this.set("selectedCategory", selectedCategoryName);
                }
            },
            // fetch items, then trigger ready to start QuizView
            retrieveItems: function() {
                var category = this.get("selectedCategory");
                var mode = this.get("mode");
                var numWeeksBefore = this.get("numWeeksBefore");
                this.get("quizItems").off();
                this.get("quizItems").on("sync", function() {

                    // Update category counter here ?
                    var selectedCategoryName = this.get("selectedCategory");
                    var selectedCategory = this.get("categories").findWhere({"category": selectedCategoryName});
                    selectedCategory.set("count", this.get("quizItems").length);

                    self.trigger("ready");
                }, this);
                this.get("quizItems").sync(category, mode, numWeeksBefore);
            },
            // called when item added or item changed and we want to refresh view
            forceRefresh: function() {
                // this.set("forceRefresh", false);
                this.retrieveItems();
            },
            triggerMatch: function() {
                this.trigger("match");
            }
        });
        return new Quiz();
    });
