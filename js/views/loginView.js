/**
 * Created by Owner on 2/13/15.
 */
define(['models/fb', 'components/fbLogin'],
    function (fb, FBLoginComponent) {
        var self;

        var LoginView = Backbone.View.extend({
            initialize: function () {
                self = this;
                fb.once('fbInitialized', this.render, this);
            },
            fbLogin: function() {
                fb.login();
            },
            render: function() {
                var loginViewInstance = (
                    <div>
                        <div id="index-header">
                        </div>
                        <div style={{textAlign: "center"}}>
                            <h3>Create your dictionary</h3>
                            <h3>Learn new words</h3>
                            <h3>Share with your friends</h3>
                        </div>
                        <FBLoginComponent
                            needLogIn={true}
                            onLoginButtonClicked={this.fbLogin}
                        />
                    </div>
                );
                React.render(loginViewInstance, document.getElementById("page-main"));
            }

        });
        return new LoginView();
    });

/*
 <div id="fb-login">
 <FBLoginComponent
 needLogIn={true}
 onLoginButtonClicked={this.fbLogin}
 />
 </div>

 ,
 goOn: function() {
 //var currentUser = Parse.User.current();
 //if (currentUser) {
 //    var id = currentUser.get("authData").facebook.id;
 //    FB.api('/' + id, function (response) {
 //        // console.log(response);
 //        console.log("hello, " + response.name);
 //    });
 //    // do stuff with the user
 //}
 },
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