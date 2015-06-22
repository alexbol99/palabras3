/**
 * Created by Owner on 6/19/15.
 */
define([],
    function () {
        return Parse.Object.extend({
            className: "Dictionaries"
        });
    });

/*
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

*/
