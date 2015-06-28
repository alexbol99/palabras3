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
                var arr = this.models.filter( function(language) { return (language.get('name') == name) });
                return arr.length > 0 ? arr[0] : null;
            }
        });

        return new Languages();
    });

/* To check if voice is supported by current TTS engine */
/* window.speechSynthesis.getVoices().filter(function(voice) { return (voice.lang == "es-ES") })[0] */
