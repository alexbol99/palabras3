/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app', 'views/editItemForm'],
    function (app, editItemForm) {
        return Backbone.View.extend({

            className: "palabra",

            initialize: function () {
                this.render();

                $(this.el).draggable({ containment: "parent", cursor: "move", revert: true });
                $(this.el).droppable({
                        drop: function( event, ui ) {
                            var other = ui.draggable[0];
                            if (this.id == other.id) {

                                if ('speechSynthesis' in window && app.get("sound")) {
                                    // Synthesis support. Make your web apps talk!
                                    var msg = new SpeechSynthesisUtterance(this.model.palabra.get("spanish"));
                                    msg.lang = 'es-ES';
                                    msg.rate = 0.9; // 0.1 to 10
                                    msg.pitch = 0.9; //0 to 2
                                    window.speechSynthesis.speak(msg);
                                }

                                $(this).html($(this).text() + " - " + $(other).text());
                                $(this).fadeOut(1500);
                                $(other).remove();
                                app.triggerMatch();
                            }
                        }
                    });
                $(this.el).on( "taphold", function(event) {
                    var position = $(this).position();
                    if ( Math.abs(position.top - this.origTop) <= 10 &&
                        Math.abs(position.left - this.origLeft) <= 10) {
                        // alert("long tap event");
                        editItemForm.openForm(this.model.palabra);
                    }
                });

            },

            render: function () {
                $(this.el).html(this.model.text);
                this.el.id = this.model.palabra.cid;     // augment element with id for matching
                this.el.model = this.model;              // augment with model for edit form initialization

                $(this.el).hide().appendTo("#palabras-container").fadeIn(1500);
                // $("#palabras-container").append(this.el);

                var containerWidth = $(this.el).parent().width();
                var left = this.model.leftside ? 0 : containerWidth/2;
                var top = this.model.y - 10;

                $(this.el).parent().css({position: 'relative'});
                $(this.el).css({top: top, left: left, position:'absolute'});

                $(this.el).width( 0.4*containerWidth );
                $(this.el).height( $(this.el).height() + 10);

                var position = $(this.el).position();
                this.el.origTop = position.top;
                this.el.origLeft = position.left;
            }

        });
    });

