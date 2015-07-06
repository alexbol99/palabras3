/**
 * Created by alexbol on 7/6/2015.
 */
define(['models/fb'],
    function (fb) {
        var Share = Parse.Object.extend({
            className: "Share",
            defaults: {
                dictionary: null,
                user: null
            },
            initialize: function() {
                this.set({
                    user: fb.currentUser()
                });
            },
            createEmptyShare: function() {
                return new Share();
            },
            deleteShare(share) {
                share.destroy();
            },
            saveUnique: function(share) {
                var query = new Parse.Query(Share)
                    .equalTo('user', share.get('user'))
                    .equalTo('dictionary', share.get('dictionary'));

                query.count().then( function(count) {
                    if (count == 0) {           // save and redirect
                        share.save().then(function() {
                            window.location.href = '#dictionaries';
                        });
                    }
                    else {                      // redirect without save
                        window.location.href = '#dictionaries';
                    }
                })
            }
        });
        return Share;
    });
