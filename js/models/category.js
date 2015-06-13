/**
 * Created by alexbol on 6/11/2015.
 */
define([],
    function () {
        return Parse.Object.extend({
            className: ""   // app.get("currentDictionary"),           // "Palabra",
/*
            addToParse: function() {
                var self = this;
                this.save( null, {
                        success: function (item) {
                            // alert('New word added: ' + item.get("spanish"));
                            // quiz.set("forceRefresh", true);
                            self.trigger("added", item);
                        },
                        error: function (item, error) {
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    }
                );
            },
            updateParse: function() {
                var self = this;
                this.save( null, {
                        success: function (item) {
                            // alert("Word '" + item.get("spanish") + "' was successfully updated");
                            // quiz.set("forceRefresh", true);
                            self.trigger("updated", item);
                        },
                        error: function (item, error) {
                            alert('Failed to update object, with error code: ' + error.message);
                        }
                    }
                );
            },
            deleteFromParse: function() {
                var self = this;
                this.destroy({
                    success: function(item) {
                        // The object was deleted from the Parse Cloud.
                        self.trigger("destroyed", item);
                    },
                    error: function(item, error) {
                        // The delete failed.
                        alert('Failed to update object, with error code: ' + error.message);
                    }
                });
            },
            sayIt: function(lang) {
                if ('speechSynthesis' in window) {
                    // Synthesis support. Make your web apps talk!
                    var msg = new SpeechSynthesisUtterance(this.get(lang));
                    msg.lang = 'es-ES';
                    msg.rate = 0.9; // 0.1 to 10
                    msg.pitch = 0.9; //0 to 2
                    window.speechSynthesis.speak(msg);
                }
            }
*/
        });
    });
