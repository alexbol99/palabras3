/**
 * Created by Owner on 1/17/15.
 */
define(['models/palabra'],
    function (PalabraParseObject) {
        var self;

        var Categories = Backbone.Collection.extend({

            initialize: function() {
                self = this;
                // this.sync();
            },

            sync: function() {
                var categories;
                var query = new Parse.Query(PalabraParseObject)
                    .select("category")
                    .limit(1000);

                var twoWeeks = (14 * 24 * 3600 * 1000);
                var currentDate = new Date();
                var newItemsDate = new Date(currentDate.getTime() - (twoWeeks));

                var modelNewWords = this.add({
                    "category": "Palabras nuevas",
                    "count": 0
                });

                query.find().then(function(results) {
                    results.forEach( function(result) {
                        var category = result.get("category");
                        var model = self.findWhere({"category": category});
                        if (model == undefined) {
                            model = self.add({
                                "category" : category,
                                "count" : 0
                            });
                        }
                        model.set("count", model.get("count")+1);

                        /* Increase counter if item considered as new item */
                        if (result.createdAt.getTime() > newItemsDate.getTime()) {
                            modelNewWords.set("count", modelNewWords.get("count")+1);
                        }
                    });
                    self.trigger("ready");
                });
            },

            changeCounter: function(category, delta) {
                var model = this.findWhere({"category": category});
                if (model != undefined) {
                    model.set("count", model.get("count")+delta);
                }
            }

        });

        return Categories;
    });
