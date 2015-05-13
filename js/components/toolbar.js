/**
 * Created by Owner on 5/8/15.
 */

define(['components/itemsFilterPopup', 'components/infoPopup'],
    function (ItemsFilterPopup, InfoPopup) {

        var Toolbar = React.createClass({
            render: function () {
                var glyphSound = (this.props.sound == "on" ? "volume-up" : "volume-off");

                const itemsFilterPopupInstance = (
                    <ItemsFilterPopup
                        categories = {this.props.categories}
                        selectedCategory = {this.props.selectedCategory}
                        numWeeksBefore = {this.props.numWeeksBefore}
                        numItems = {this.props.numItems}
                        onCategorySelected = {this.props.onCategorySelected}
                        onNumWeeksBeforeChanged = {this.props.onNumWeeksBeforeChanged}
                    />
                );

                const toolbarInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.ModalTrigger modal={itemsFilterPopupInstance}>
                                    <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.props.onClickFilterButton}>
                                        <ReactBootstrap.Glyphicon glyph='filter' />
                                    </ReactBootstrap.Button>
                                </ReactBootstrap.ModalTrigger>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.props.onClickSoundButton}>
                                    <ReactBootstrap.Glyphicon glyph={glyphSound} />
                                </ReactBootstrap.Button>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.sort}>
                                    <ReactBootstrap.Glyphicon glyph='refresh' />
                                </ReactBootstrap.Button>
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.ModalTrigger modal={<InfoPopup />}>
                                    <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.sort}>
                                        <ReactBootstrap.Glyphicon glyph='info-sign' />
                                    </ReactBootstrap.Button>
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
