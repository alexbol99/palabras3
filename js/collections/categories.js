/**
 * Created by Owner on 1/17/15.
 */
define(['models/palabra'],
    function (PalabraParseObject) {
        var self;

        var Categories = Backbone.Collection.extend({

            initialize: function() {
                self = this;
            },

            sync: function(/*numWeeksBefore*/) {

                var query = new Parse.Query(PalabraParseObject)
                    .select("category")
                    .limit(1000);

                this.reset();
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

                        /*
                        var queryCat = new Parse.Query(CategoryClass)
                            .equalTo("category", category);
                        queryCat.find().then( function(categoryCat) {
                            result.set("category_id", categoryCat[0].id);
                            result.save();
                        })
                        */
                    });

                    /*
                    var CategoryClass = Parse.Object.extend("Class_Alberto_Ru_Cat");
                    self.models.forEach( function(category) {
                        var categoryParseObject = new CategoryClass();
                        categoryParseObject.set("category", category.get("category"));
                        categoryParseObject.save();
                    });
                    */

                    self.trigger("ready");
                });
            }
        });

        return Categories;
    });
