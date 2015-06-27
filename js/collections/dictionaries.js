/**
 * Created by Owner on 6/19/15.
 */
define(['models/dictionary'],
    function (Dictionary) {
        var Dictionaries = Parse.Collection.extend({
            model: "Dictionaries",
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

            },
            find: function(id) {
                this.query = new Parse.Query(Dictionary)
                    .equalTo("objectId", id)
                    .include('language1')
                    .include('language2');

                //this.query.find().then( function(resp) {  // unique id, supposed only one in response
                //    var dictionary = resp[0];
                //    callback(dictionary);
                //})
                return this.query.first();        // return promise
            },
            clone: function() {
                var newDictionaries = new Dictionaries();
                var array = this.models.slice();
                newDictionaries.add(array);
                return newDictionaries;
            },
            addDictionary: function(dictionary) {
                //var newDictionaries = this.clone();
                //newDictionaries.add(dictionary, {at: 0});
                //return dictionary;
                this.add(dictionary);
            }
        });

        return new Dictionaries();
    });

/*
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
