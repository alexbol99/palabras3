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
            }

        });

        return new Languages();
    });
