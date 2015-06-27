/**
 * Created by Owner on 6/26/15.
 */
define([],
    function () {
        var Languages = Parse.Collection.extend({
            model: "Language",
            /*query: new Parse.Query(Category),*/
            //comparator: function(model) {
            //    return model.get('category');
            //},
            initialize: function() {
                // this.query = new Parse.Query(Category);
                this.sync();
            },

            sync: function() {
                this.query = new Parse.Query(this.model)
                    .ascending('category');
                // this.query.ascending('category');
                this.fetch({reset: true});
            },
            // Parse collection does not have Backbone's findWhere method
            find: function(name) {
                var foundLanguage = null;
                this.models.forEach( function(language) {
                    if (language.get('name') == name) {
                        foundLanguage = language;
                    }
                });
                return foundLanguage;
            }
        });

        return new Languages();
    });
