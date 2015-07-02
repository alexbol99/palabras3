/**
 * Created by alexbol on 7/2/2015.
 */
define(['models/app'],
    function (app) {
        var self;
        var FBModel = Backbone.Model.extend({
            defaults: {
                facebook_id: ""
            },
            initialize: function () {
                self = this;
                window.fbAsyncInit = function() {
                    Parse.FacebookUtils.init({
                        appId      : '398066583702762',
                        cookie     : true,  // enable cookies to allow Parse to access the session
                        xfbml      : false, // initialize Facebook social plugins on the page - do not check for plugin, not using them
                        version    : 'v2.3' // point to the latest Facebook Graph API version
                    });

                    // Run code after the Facebook SDK is loaded.
                    // FacebookLogIn();
                    self.trigger("fbready");
                    // self.render();
                    // var loginView = new LoginView();
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        });
        return new FBModel();
    });