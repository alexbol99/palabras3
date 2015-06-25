/**
 * Created by Owner on 6/19/15.
 */
define(['models/dictionary'],
    function (Dictionary) {
        var Dictionaries = Parse.Collection.extend({
            model: Dictionary,
            /*query: new Parse.Query(Category),*/
            //comparator: function(model) {
            //    return model.get('category');
            //},
            initialize: function() {
                // this.query = new Parse.Query(Category);
            },

            sync: function() {
                this.query = new Parse.Query(Dictionary)
                    .include('language1')
                    .include('language2');
                this.fetch({reset: true})

            }
        });

        return new Dictionaries();
    });

/*
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
*/
