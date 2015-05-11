/**
 * Created by Owner on 5/8/15.
 */

define(['components/itemsFilterPopup', 'components/infoPopup'],
    function (ItemsFilterPopup, InfoPopup) {

        var Toolbar = React.createClass({
            categoryChanged: function(event) {
                console.log(event.target.value)
            },
            getInitialState: function () {
                return {
                    data: []
                }
            },
            render: function () {
                var ButtonToolbar = ReactBootstrap.ButtonToolbar;
                var Button = ReactBootstrap.Button;

/*
                var catButton = "";
                if (this.props.selectedCategory.get) {
                    var catButton = this.props.selectedCategory.get("category") +
                        ' (' + this.props.selectedCategory.get("count") + ')';
                }
*/
                var glyphSound = (this.props.sound == "on" ? "volume-up" : "volume-off");
                /*
                <ReactBootstrap.ButtonGroup>
                    <Button bsStyle='default' bsSize='medium'>
                                    {catButton}
                    </Button>
                </ReactBootstrap.ButtonGroup>
                */

                const itemsFilterPopupInstance = (
                    <ItemsFilterPopup
                        categories = {this.props.categories}
                        onCategorySelected = {this.props.onCategorySelected}
                    />
                );

                const toolbarInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.ModalTrigger modal={itemsFilterPopupInstance}>
                                    <Button bsStyle='primary' bsSize='medium' onClick={this.props.onClickFilterButton}>
                                        <ReactBootstrap.Glyphicon glyph='filter' />
                                    </Button>
                                </ReactBootstrap.ModalTrigger>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <Button bsStyle='primary' bsSize='medium' onClick={this.props.onClickSoundButton}>
                                    <ReactBootstrap.Glyphicon glyph={glyphSound} />
                                </Button>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <Button bsStyle='primary' bsSize='medium' onClick={this.sort}>
                                    <ReactBootstrap.Glyphicon glyph='refresh' />
                                </Button>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.ModalTrigger modal={<InfoPopup />}>
                                    <Button bsStyle='primary' bsSize='medium' onClick={this.sort}>
                                        <ReactBootstrap.Glyphicon glyph='info-sign' />
                                    </Button>
                                </ReactBootstrap.ModalTrigger>
                            </ReactBootstrap.ButtonGroup>

                        </ReactBootstrap.ButtonGroup>

                    </div>
                );
                return toolbarInstance;
            }
        });

        return Toolbar;
    });
