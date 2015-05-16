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

                const buttonFilter = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.ModalTrigger modal={itemsFilterPopupInstance}>
                            <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.props.onClickFilterButton}>
                                <ReactBootstrap.Glyphicon glyph='filter' />
                            </ReactBootstrap.Button>
                        </ReactBootstrap.ModalTrigger>
                    </ReactBootstrap.ButtonGroup>
                );

                const buttonSound = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.props.onClickSoundButton}>
                            <ReactBootstrap.Glyphicon glyph={glyphSound} />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                const buttonShuffle = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.sort}>
                            <ReactBootstrap.Glyphicon glyph='refresh' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                const buttonInfo = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.ModalTrigger modal={<InfoPopup />}>
                            <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.sort}>
                                <ReactBootstrap.Glyphicon glyph='info-sign' />
                            </ReactBootstrap.Button>
                        </ReactBootstrap.ModalTrigger>
                    </ReactBootstrap.ButtonGroup>
                );

                var buttonAdd = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.sort}>
                            <ReactBootstrap.Glyphicon glyph='plus' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                var buttonDelete = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' onClick={this.sort}>
                            <ReactBootstrap.Glyphicon glyph='remove' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                var button1 = buttonFilter;
                var button2 = buttonSound;
                var button3 = this.props.mode == "Edit" ? buttonAdd : buttonShuffle;
                var button4 = this.props.mode == "Edit" ? buttonDelete : buttonInfo;

                const toolbarInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>
                            {button1}
                            {button2}
                            {button3}
                            {button4}
                        </ReactBootstrap.ButtonGroup>
                    </div>
                );
                return toolbarInstance;
            }
        });

        return Toolbar;
    });
