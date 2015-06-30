/**
 * Created by Owner on 2/13/15.
 */
define(['components/fbLogin'],
    function (FBLoginComponent) {
        var self;

        var LoginView = Backbone.View.extend({
            initialize: function () {
                self = this;
                window.fbAsyncInit = function() {
                    Parse.FacebookUtils.init({
                        appId      : '398066583702762',
                        status     : true,  // check Facebook Login status
                        cookie     : true,  // enable cookies to allow Parse to access the session
                        xfbml      : true,  // initialize Facebook social plugins on the page
                        version    : 'v2.2' // point to the latest Facebook Graph API version
                    });

                    // Run code after the Facebook SDK is loaded.
                    // FacebookLogIn();
                    self.render();

                    // var loginView = new LoginView();
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
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
            },
            render: function() {
                var dictionarySettingsComponentInstance = (
                    <FBLoginComponent
                        needLogIn={true}
                        onLoginButtonClicked={this.fbLogin}
                    />
                );
                React.render(dictionarySettingsComponentInstance, document.getElementById("fb-login"));
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