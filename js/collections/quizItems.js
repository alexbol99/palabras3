/**
 * Created by alexbol on 2/10/2015.
 */
define(['../models/quizItem'],
    function (QuizItem) {
        var self;

        var QuizItems = Parse.Collection.extend({
            model: QuizItem,
            // query: new Parse.Query(QuizItem),

            initialize: function() {
                this.query = new Parse.Query(QuizItem);
            },

            sync: function(selectionMode, category, numWeeksBefore) {
                    if (selectionMode == "all") {
                        var numTiksBefore = (numWeeksBefore * 7 * 24 * 3600 * 1000);
                        var currentDate = new Date();
                        var newItemsDate = new Date(currentDate.getTime() - (numTiksBefore));

                        this.query.greaterThanOrEqualTo( "createdAt", newItemsDate );
                        if (this.query._where.category) {
                            delete this.query._where.category;
                        }
                        this.query.limit(1000); // limit to at most 1000 results
                    }
                    else {
                        this.query.equalTo("category", category);
                        if (this.query._where.createdAt) {
                            delete this.query._where.createdAt
                        }
                    }

                    this.query.ascending("spanish");

                    this.fetch({reset: true});

            },

            getRandom: function(maxnum) {
                var newItems = new QuizItems();
                var inds = [];
                // var maxnum = this.maxNum;
                var i;

                if (this.length <= maxnum) {
                    this.forEach(function(p) {
                        newItems.add(p);
                    });
                    return newItems;
                }

                while (inds.length < maxnum) {
                    i = Math.floor((Math.random() * (this.length-1)) + 1);
                    if (inds.indexOf(i) == -1) {
                        inds.push(i);
                    }
                }

                inds.forEach(function(i) {
                    newItems.add(this.at(i));
                }, this);
                return newItems;
            },

            // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
            shuffle: function() {
                var newItems = new QuizItems();
                var array = this.models.slice();
                var counter = array.length, temp, index;

                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);

                    // Decrease counter by 1
                    counter--;

                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }

                newItems.add(array);
                return newItems;
            },

            clone: function() {
                var newItems = new QuizItems();
                var array = this.models.slice();
                newItems.add(array);
                return newItems;
            }

        });

        return QuizItems;
    });
