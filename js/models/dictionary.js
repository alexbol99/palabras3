/**
 * Created by Owner on 6/26/15.
 */
define(['collections/languages'],
    function (languages) {
        var Dictionary = Parse.Object.extend({
            className: "Dictionaries",
            defaults: {
                name: '',
                language1: null,
                language2: null
            },
            initialize: function() {
                if (languages.length > 0) {
                    this.set({
                        language1: languages.at(0),
                        language2: languages.at(0)
                    });
                }
            },
            createEmptyDictionary: function() {
                return new Dictionary();
            }
        });
        return Dictionary;
    });
