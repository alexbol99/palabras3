/**
 * Created by alexbol on 7/2/2015.
 */
define([],
    function () {
        var self;
        var FBModel = Backbone.Model.extend({
            defaults: {
                initialized: false,
                name: "",
                picture: ""
            },
            initialize: function () {
                self = this;
            },
            initFacebook: function() {
                if (this.get('initialized')) {
                    self.trigger("fbInitialized");
                }
                else {
                    if (_gIsFBLoaded) {
                        self.set('initialized', true);
                        self.trigger("fbInitialized");
                    }
                    else {
                        window.fbAsyncInit = function () {
                            Parse.FacebookUtils.init({
                                appId: '398066583702762',
                                cookie: true,  // enable cookies to allow Parse to access the session
                                xfbml: false, // initialize Facebook social plugins on the page - do not check for plugin, not using them
                                version: 'v2.3' // point to the latest Facebook Graph API version
                            });

                            // Run code after the Facebook SDK is loaded.
                            self.set('initialized', true);
                            self.trigger("fbInitialized");
                        };

                        (function (d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0];
                            if (d.getElementById(id)) {
                                return;
                            }
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "//connect.facebook.net/en_US/sdk.js";
                            fjs.parentNode.insertBefore(js, fjs);
                        }(document, 'script', 'facebook-jssdk'));
                    }
                }
            },
            auth: function() {
                this.off('fbInitialized');
                this.once('fbInitialized', function() {
                    // Run code after the Facebook SDK is loaded.
                    FB.getLoginStatus(function(response) {
                        var currentUser = Parse.User.current();
                        if (response.status === 'connected' && currentUser) {
                            self.trigger("authenticated");     // Logged into your app and Facebook.
                            // testAPI();
                        }
                        else {
                            if (response.status === 'not_authorized') {
                                self.trigger("raiseLoginPopup");
                                // The person is logged into Facebook, but not your app.
                                //document.getElementById('status').innerHTML = 'Please log ' +
                                //'into this app.';
                            } else {
                                self.trigger("raiseLoginPopup");
                                // The person is not logged into Facebook, so we're not sure if
                                // they are logged into this app or not.
                                //document.getElementById('status').innerHTML = 'Please log ' +
                                //'into Facebook.';
                            }
                        }
                    });
                }, this);
                this.initFacebook();
            },
            login: function() {
                Parse.FacebookUtils.logIn("user_friends", {
                    success: function(user) {
                        self.trigger("authenticated");
                    },
                    error: function(user, error) {
                        alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                });
            },
            logout: function() {
                Parse.User.logOut();
            },
            getId: function() {
                var currentUser = Parse.User.current();
                if (currentUser) {
                    return currentUser.get("authData").facebook.id;
                }
            },
            currentUser: function() {
                return Parse.User.current();
            },
            share: function(directoryId) {
                FB.ui({
                    method: 'share',
                    description: "Your description",
                    name: "Share this",
                    href: window.location.protocol + '//' + window.location.host + window.location.pathname + '#share/' + directoryId
                }, function (response) {  });
            },
            getNameAndPicture: function() {
                var id = self.getId();
                FB.api('/' + id + '?fields=name, picture', function (response) {
                    self.set({
                        "name": response.name,
                        "picture": response.picture.data.url
                    });
                });
            }
        });
        return new FBModel();
    });