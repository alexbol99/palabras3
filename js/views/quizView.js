/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app', 'collections/quizItems', 'views/textbox'],
    function (app, QuizItems, Textbox) {
        var self;

        var Quiz = Backbone.View.extend({

            el: "div#div-main",

            initialize: function () {
                self = this;
                this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                app.on("match", this.match, this);
            },

            events: {
                "click #toggle-sound-button" : "toggleSound",
                "click #refresh-button" : "refresh_cb",
                "change #language" : "refresh_cb"
            },

            retrieveFromParse: function(category) {
                this.quizItems = new QuizItems(category);
                this.quizItems.on("sync", function() {
                    self.refresh();
                });
            },

            start: function( category ) {
                this.retrieveFromParse(category);
            },

            refresh_cb: function() {
                self.refresh();
            },

            match: function() {
                this.curNum--;
                if (this.curNum == 0) {
                    this.refresh();
                }
            },

            refresh: function () {
                this.clearAll();

                this.palabras = this.quizItems.getRandom(this.maxNum);

                this.curNum = this.palabras.length;

                var y_position = 0;

                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var spanish = new Textbox({
                            model: {
                                palabra: palabra,
                                leftside: true,
                                text: palabra.get("spanish"),
                                y: y_position
                            }
                        });

                        y_position += 50;
                    }
                }, this);

                this.quizItems.shuffle(this.palabras);

                var otherLanguage = $("#language").val();
                var hebrew = otherLanguage == "hebrew" ? true : false

                var y_position = 0;
                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var other = new Textbox({
                            model: {
                                palabra: palabra,
                                leftside: false,
                                text: palabra.get(otherLanguage),
                                y: y_position,
                                hebrew: hebrew
                            }
                        });

                        y_position += 50;
                    }
                });
            },

            clearAll: function() {
                $("#palabras-container").empty();
            },

            toggleSound: function(event) {
                var button = event.currentTarget;
                if (app.get("sound")) {
                    $(button).removeClass('ui-icon-audio');
                }
                else {
                    $(button).addClass('ui-icon-audio');
                }
                app.set("sound", !app.get("sound"));
            }
        });

        return new Quiz();
    });

