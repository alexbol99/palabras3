/**
 * Created by alexbol on 1/8/2015.
 */

define(['models/quiz',
        'views/selectCategory', 'views/textbox', 'views/addItemForm', '../components/toolbar'],
    function (quiz, SelectCategoryView, Textbox, addItemForm, Toolbar) {
        var self;

        var Quiz = Backbone.View.extend({

            el: "div#div-main",

            templateHeader: _.template(
                '<a href="#" data-position-to="window" class="ui-btn ui-btn-inline ui-shadow ui-icon-audio ui-btn-icon-notext" id="toggle-sound-button"></a>' +
                '<a href="#" data-position-to="window" class="ui-btn ui-btn-inline ui-shadow ui-icon-refresh ui-btn-icon-notext" id="refresh-button"></a>' +
                '<a href="#addItemFormPopup" data-position-to="window" data-rel="popup" class="ui-btn ui-btn-inline ui-shadow ui-icon-plus ui-btn-icon-notext" id="add-button">Add</a>'
            ),

            initialize: function () {
                self = this;
                this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                quiz.on("match", this.match, this);
                quiz.on("ready", this.render, this);

                this.selectCategoryView = new SelectCategoryView();
            },

            events: {
                "click #toggle-sound-button" : "toggleSound",
                "click #refresh-button" : "refresh_cb",
                "click #play-button" : "setAppMode",
                "click #edit-button" : "setAppMode"
            },

            render: function() {
                console.log("ready to start!");
                var toolbarInstance = (
                    <Toolbar categories={quiz.get("categories").models} />
                )
                React.render(toolbarInstance, document.body);
            },
            // Render view and start the game
            jrender: function() {
                if (!quiz.get("started")) {
                    $(this.el).find("header").append(this.templateHeader());

                    this.selectCategoryView.render();

                    $("#add-button").on("click", addItemForm.openForm);

                    quiz.set("started", true);
                }

                if (quiz.get("forceRefresh")) {
                    this.selectCategoryView.render();
                    this.set("forceRefresh", false);
                }

                this.clearAll();

                $("#play-button").show();
                if (quiz.get("mode") == "Play") {
                    $("#refresh-button").show();
                    $("#add-button").hide();
                }
                else {
                    $("#add-button").show();
                    $("#refresh-button").hide();
                }

                this.quizItems = quiz.get("quizItems");
                this.refresh();

            },

            setAppMode: function(event) {
                quiz.set("mode", $(event.currentTarget).text());
                self.render();
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

                if (quiz.get("mode") == "Play") {
                    this.palabras = this.quizItems.getRandom(this.maxNum);
                }
                else {
                    this.palabras = this.quizItems;
                }

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

                if (quiz.get("mode") == "Play") {
                    this.quizItems.shuffle(this.palabras);
                }

                var otherLanguage = "russian";  // $("#language").val();
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
                if (quiz.get("sound")) {
                    $(button).removeClass('ui-icon-audio');
                }
                else {
                    $(button).addClass('ui-icon-audio');
                }
                quiz.set("sound", !quiz.get("sound"));
            }

        });

        return new Quiz();
    });

