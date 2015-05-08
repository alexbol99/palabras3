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
                sound: true
            },
            initialize: function() {
                self = this;
                app.on("change:currentDictionary", this.start, this);
                this.on("change:selectedCategory", this.retrieveItems, this);
                this.on("change:forceRefresh", this.forceRefresh, this);
            },
            // on quiz selected start to create stuff
            start: function() {
                Palabra.prototype.className = app.get("currentDictionary");
                this.set("categories", new Categories());
                this.set("quizItems", new QuizItems());
                this.get("categories").on("ready", this.setSelectedCategory, this);
                this.get("categories").sync();

                this.set("mode", "Play");
            },
            // on categories sync'ed, set first category as selected category
            // it will trigger retrieveItems
            setSelectedCategory: function() {
                var model = this.get("categories").at(0);
                var category = model.get("category");
                this.set("selectedCategory", category);
            },
            // fetch items, then trigger ready to start QuizView
            retrieveItems: function() {
                var category = this.get("selectedCategory");
                var mode = this.get("mode");
                this.get("quizItems").off();
                this.get("quizItems").on("sync", function() {
                    self.trigger("ready");
                });
                this.get("quizItems").sync(category, mode);
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
