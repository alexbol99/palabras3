/**
 * Created by alexbol on 7/2/2015.
 */
define([],
    function () {
        var self;
        var FBModel = Backbone.Model.extend({
            defaults: {
                initialized: false
            },
            initialize: function () {
                self = this;
            },
            initFacebook: function() {
                if (this.get('initialized')) {
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
                        // FacebookLogIn();
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
            },
            auth: function() {
                var currentUser = Parse.User.current();
                if (currentUser) {
                    this.trigger("authenticated");
                    // this.set('id', currentUser.get("authData").facebook.id);
                    // FB.api('/' + id, function (response) {
                        // console.log(response);
                       // console.log("hello, " + response.name);
                    // });
                    // do stuff with the user
                }
                else {
                    this.initFacebook();
                    //if (this.get('initialized')) {
                    //    self.trigger("fbInitialized");
                    //}
                    //else {
                    //    this.initFacebook();
                    //}
                }
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
                    this.set('id', currentUser.get("authData").facebook.id);
                }
            },
            currentUser: function() {
                return Parse.User.current();
            },
            share: function(directoryId) {
                this.off('fbInitialized');
                this.once('fbInitialized', function() {
                    FB.ui({
                        method: 'share',
                        description: "Your description",
                        name: "Share this",
                        href: window.location.protocol + '//' + window.location.host + window.location.pathname + '#share/' + directoryId
                    }, function (response) {  });
                }, this);
                this.initFacebook();
            }
        });
        return new FBModel();
    });