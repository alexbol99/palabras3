/**
 * Created by alexbol on 2/9/2015.
 */
define(['models/app'],
    function () {
        return Parse.Object.extend({
            className: "Quiz"
/*
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
*/
        });
    });
