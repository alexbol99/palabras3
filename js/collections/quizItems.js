/**
 * Created by alexbol on 2/10/2015.
 */
define(['models/palabra'],
    function (PalabraParseObject) {
        var self;

        var QuizItems = Parse.Collection.extend({
            model: PalabraParseObject,
            // query: new Parse.Query(PalabraParseObject),

            initialize: function() {
                this.query = new Parse.Query(PalabraParseObject);
            },

            sync: function(category, mode, numWeeksBefore) {
                if (category) {
                    if (category == "All") {
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
                    // if (mode == "Edit") {
                    this.query.ascending("spanish");
                    // }
                    this.fetch({reset: true});
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
            },

            // Augment item with "editable" flag
            dropEditable: function() {
                return this.forEach(function(item) {
                    item.set("editable", false);
                })
            },

            // Set flag "editable" for selected item, drop for all others
            setEditable: function(itemForEdit) {
                this.forEach(function(item) {
                    item === itemForEdit ? item.set("editable", true) : item.set("editable", false);
                })
            }
        });

        return QuizItems;
    });
