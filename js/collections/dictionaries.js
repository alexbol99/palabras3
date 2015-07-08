/**
 * Created by Owner on 6/19/15.
 */
define(['models/dictionary', 'models/share'],
    function (Dictionary, Share) {
        var self;
        var Dictionaries = Parse.Collection.extend({
            model: "Dictionaries",
            /*query: new Parse.Query(Category),*/
            //comparator: function(model) {
            //    return model.get('category');
            //},
            initialize: function() {
                self = this;
                // this.query = new Parse.Query(Category);
            },

            sync: function() {
                var user = Parse.User.current();

                this.query = new Parse.Query(Dictionary)
                    .equalTo("createdBy", user)
                    .include('language1')
                    .include('language2')
                    .include('createdBy');

                var sharedWithMeQuery = new Parse.Query(Share)
                    .equalTo("user", user)
                    .include("dictionary")
                    .select("dictionary");

                this.reset();

                this.query.find(function (resp) {
                    self.add(resp);
                }).then(
                    function() {
                        return  sharedWithMeQuery.find(function (respArr) {
                            respArr.forEach(function (resp) {
                                var dictionary = resp.get('dictionary');
                                if (!self.get(dictionary)) {
                                    self.add(dictionary);
                                }
                            });

                            self.trigger('sync');
                        });
                    });

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
            },
            deleteDictionary(dictionary) {
                // destroy dictionary itself
                dictionary.destroy();

                // destroy all share records related to this dictionary
                var sharedQuery = new Parse.Query(Share)
                    .equalTo("dictionary", dictionary)

                sharedQuery.find().then(function( respArr ) {
                    respArr.forEach(function (share) {
                        share.destroy();
                    });
                })
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
