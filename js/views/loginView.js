/**
 * Created by Owner on 2/13/15.
 */
define(['models/fb', 'components/fbLogin'],
    function (fb, FBLoginComponent) {
        var self;

        var LoginView = Backbone.View.extend({
            initialize: function () {
                self = this;
                fb.on('raiseLoginPopup', this.render, this);
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
