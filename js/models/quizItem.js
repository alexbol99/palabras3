/**
 * Created by alexbol on 1/8/2015.
 */
define([],
    function () {
        return Parse.Object.extend({
            className: "",   // app.get("currentDictionary"),           // "Palabra",

            addToParse: function() {
                var self = this;
                this.save( null, {
                        success: function (item) {
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

            sayIt: function(language1, language2) {
                if ('speechSynthesis' in window) {
                    // Synthesis support. Make your web apps talk!
                    this.sayItInLanguage(language1);
                    this.sayItInLanguage(language2);
                }
            },

            sayItInLanguage: function(language) {
                var voices = window.speechSynthesis.getVoices();

                if (language) {
                    var voice = voices.filter(function (voice) {
                        return voice.lang == language.get('lcid');
                    })[0];

                    if (voice) {
                        var utterance = new SpeechSynthesisUtterance();
                        utterance.voice = voice;
                        utterance.text = this.get(language.get('name'));
                        utterance.lang = language.get('lcid');                 //  'es-ES';
                        utterance.rate = 0.9; // 0.1 to 10
                        utterance.pitch = 0.9; //0 to 2
                        window.speechSynthesis.speak(utterance);
                    }
                }
            }
        });
    });
