/**
 * Created by Owner on 1/17/15.
 */
define(['../models/quizItem', 'models/category'],
    function (QuizItem, Category) {
        var self;

        var Categories = Backbone.Collection.extend({

            initialize: function() {
                self = this;
            },

            sync: function(/*numWeeksBefore*/) {

                var queryCat = new Parse.Query(Category);

                var query = new Parse.Query(QuizItem)
                    .select("category_id")
                    .limit(1000);

                this.reset();

                // 1. Add all categories to the histogram
                queryCat.find().then( function(catList) {
                    catList.forEach( function(cat) {
                        self.add({
                            "category_id": cat.id,
                            "category": cat.get("category"),
                            "count" : 0
                        });
                    });

                    // 2. Over all the items and count
                    query.find().then(function(items) {
                        items.forEach( function(item) {
                            var category_id = item.get("category_id");
                            var model = self.findWhere({"category_id": category_id});
                            //if (model == undefined) {
                            //    model = self.add({
                            //        "category_id": category_id,
                            //        "category" : category,
                            //        "count" : 0
                            //    });
                            //}
                            if (model) {
                                model.set("count", model.get("count") + 1);
                            }
                        });

                        self.trigger("ready");
                    });

                });
            }
        });

        return Categories;
    });


/*
 var queryCat = new Parse.Query(CategoryClass)
 .equalTo("category", category);
 queryCat.find().then( function(categoryCat) {
 result.set("category_id", categoryCat[0].id);
 result.save();
 })
 */

/*
 var CategoryClass = Parse.Object.extend("Class_Alberto_Ru_Cat");
 self.models.forEach( function(category) {
 var categoryParseObject = new CategoryClass();
 categoryParseObject.set("category", category.get("category"));
 categoryParseObject.save();
 });
 */

