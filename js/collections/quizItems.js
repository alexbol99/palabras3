/**
 * Created by alexbol on 2/10/2015.
 */
define(['models/app','models/palabra'],
    function (app, PalabraParseObject) {
        var self;

        var QuizItems = Parse.Collection.extend({
            model: PalabraParseObject,
            query: new Parse.Query(PalabraParseObject),

            initialize: function(category) {
                if (category) {
                    if (category == "Palabros nuevos") {
                        var twoWeeks = (14 * 24 * 3600 * 1000);
                        var currentDate = new Date();
                        var newItemsDate = new Date(currentDate.getTime() - (twoWeeks));

                        this.query.greaterThanOrEqualTo( "createdAt", newItemsDate );
                        if (this.query._where.category) {
                            delete this.query._where.category;
                        }
                        this.fetch({reset: true});
                    }
                    else {
                        this.query.equalTo("category", category);
                        if (this.query._where.createdAt) {
                            delete this.query._where.createdAt
                        }
                        this.fetch({reset: true});
                    }
                }
            },

            getRandom: function(maxnum) {
                var palabras = [];
                var inds = [];
                // var maxnum = this.maxNum;
                var i;

                if (this.length <= maxnum) {
                    this.forEach(function(p) {
                        palabras.push(p);
                    });
                    return palabras;
                }

                while (inds.length < maxnum) {
                    i = Math.floor((Math.random() * (this.length-1)) + 1);
                    if (inds.indexOf(i) == -1) {
                        inds.push(i);
                    }
                }

                inds.forEach(function(i) {
                    palabras.push(this.at(i));
                }, this);
                return palabras;
            },

            // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
            shuffle: function(array) {
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

                return array;
            }
        });

        return QuizItems;
    });
