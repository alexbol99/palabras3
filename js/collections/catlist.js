/**
 * Created by Owner on 6/11/15.
 */
define(['../models/category'],
    function (Category) {
        var CatList = Parse.Collection.extend({
            model: Category,
            /*query: new Parse.Query(Category),*/
            //comparator: function(model) {
            //    return model.get('category');
            //},
            initialize: function() {
               // this.query = new Parse.Query(Category);
            },

            sync: function() {
                this.query = new Parse.Query(Category);
                // this.query.ascending('category');
                this.fetch({reset: true})

            },
            clone: function() {
                var newCategories = new CatList();
                var array = this.models.slice();
                newCategories.add(array);
                return newCategories;
            },
            addEmpty: function(category) {
                var newCatList = this.clone();
                newCatList.add(category, {at: 0});
                return newCatList;
            },
            deleteCategory: function(category) {
                var newCatList = this.clone();
                newCatList.remove(category);
                return newCatList;
            },
            sortCategories: function() {
                var newCatList = this.clone();
                newCatList.sort();
                return newCatList;
            }

        });

        return new CatList();
    });
