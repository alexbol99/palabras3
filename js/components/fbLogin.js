/**
 * Created by Owner on 6/30/15.
 */
define([],
    function () {
        const FBLoginComponent = React.createClass({
        render() {
            var loginInstance = this.props.needLogIn ? (
                <ReactBootstrap.Button className="fb-login-button-class" onClick={this.props.onLoginButtonClicked}></ReactBootstrap.Button>
            ) : null;

                return (
                    <div>
                        {loginInstance}
                    </div>
                );
            }
        });

        return FBLoginComponent;
    });
