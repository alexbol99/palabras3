/**
 * Created by Owner on 2/13/15.
 */
define(['models/app'],
    function (app) {
        var self;

        var LoginView = Backbone.View.extend({

            el: "div#page-main",

            initialize: function () {
                Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");
                self = this;
            },

            events: {
                "click #fb-login-button" : "fbLogin"
            },

            fbLogin: function() {
                Parse.FacebookUtils.logIn("user_friends", {
                    success: function(user) {
                        if (!user.existed()) {
                            // welcome new user
                            alert("welcome new user!");
                        } else {
                            // welcome existing user
                            alert("welcome back!");
                        }
                        self.goOn();
                    },
                    error: function(user, error) {
                        alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                });
            },

            goOn: function() {
                var currentUser = Parse.User.current();
                if (currentUser) {
                    var id = currentUser.get("authData").facebook.id;
                    FB.api('/' + id, function (response) {
                        // console.log(response);
                        console.log("hello, " + response.name);
                    });
                    // do stuff with the user
                }
            }

        });
        return LoginView;
    });

/*
function FacebookLogIn() {
    var currentUser = null; //Parse.User.current();

    if (currentUser) {
        goOn();
    }
    else {
        Parse.FacebookUtils.logIn("user_friends", {
            success: function(user) {
                if (!user.existed()) {
                    // welcome new user
                    alert("welcome new user!");
                } else {
                    // welcome existing user
                    alert("welcome back!");
                }
                goOn();
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }
}

function goOn() {
    var currentUser = Parse.User.current();
    if (currentUser) {
        var id = currentUser.get("authData").facebook.id;
        FB.api('/' + id, function(response) {
            // console.log(response);
            alert("hello, " + response.name);
        });
        // do stuff with the user
    }
}
*/