/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/app'],
    function (app) {
        return Parse.Object.extend({
            className: app.get("currentDictionary"),           // "Palabra",

            addToParse: function() {
                var self = this;
                this.save( null, {
                        success: function (palabra) {
                            alert('New word added: ' + palabra.get("spanish"));
                            self.trigger("added");
                        },
                        error: function (palabra, error) {
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    }
                );
            },
            updateParse: function() {
                var self = this;
                this.save( null, {
                        success: function (palabra) {
                            alert("Word '" + palabra.get("spanish") + "' was successfully updated");
                            // self.trigger("added");
                        },
                        error: function (palabra, error) {
                            alert('Failed to update object, with error code: ' + error.message);
                        }
                    }
                );
            }
        });
    });
