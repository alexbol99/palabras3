/**
 * Created by Owner on 5/15/15.
 */
define(['components/itemsFilterPopup', 'components/infoPopup'],
    function (ItemsFilterPopup, InfoPopup) {

        var Menu = React.createClass({
            render: function () {
                const menuInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.Button bsStyle='default' bsSize='large' onClick={this.props.onButtonEditClicked}>
                                    Edit
                                </ReactBootstrap.Button>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.Button bsStyle='default' bsSize='large' onClick={this.props.onButtonPlayClicked}>
                                    Play
                                </ReactBootstrap.Button>
                            </ReactBootstrap.ButtonGroup>

                        </ReactBootstrap.ButtonGroup>

                    </div>
                );
                return menuInstance;
            }
        });

        return Menu;
    });

/*
 <ReactBootstrap.ButtonGroup>
 <ReactBootstrap.Button bsStyle='default' bsSize='large' onClick={this.props.onMenuButtonClicked}>
 Learn
 </ReactBootstrap.Button>
 </ReactBootstrap.ButtonGroup>
 */
