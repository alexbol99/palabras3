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
                        selectedCategoryName = {this.props.selectedCategoryName}
                        selectedCategoryCount = {this.props.selectedCategoryCount}
                        numWeeksBefore = {this.props.numWeeksBefore}
                        numItems = {this.props.numItems}
                        onCategorySelected = {this.props.onCategorySelected}
                        onNumWeeksBeforeChanged = {this.props.onNumWeeksBeforeChanged}
                    />
                );

                const buttonFilter = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.ModalTrigger modal={itemsFilterPopupInstance}>
                            <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Filter" onClick={this.props.onClickFilterButton}>
                                <ReactBootstrap.Glyphicon glyph='filter' />
                            </ReactBootstrap.Button>
                        </ReactBootstrap.ModalTrigger>
                    </ReactBootstrap.ButtonGroup>
                );

                const buttonSound = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Toggle sound on/off" onClick={this.props.onClickSoundButton}>
                            <ReactBootstrap.Glyphicon glyph={glyphSound} />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                const buttonShuffle = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Shuffle" onClick={this.props.onClickShuffleButton}>
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
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Add item or category" onClick={this.props.onClickAddButton}>
                            <ReactBootstrap.Glyphicon glyph='plus' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                var buttonEdit = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Edit item" onClick={this.props.onClickEditButton}>
                            <ReactBootstrap.Glyphicon glyph='pencil' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                var buttonDelete = this.props.mode == "Edit" && this.props.selectedItemId != undefined ? (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Remove item" onClick={this.props.onClickDeleteButton}>
                            <ReactBootstrap.Glyphicon glyph='remove' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                ) : null;

                var buttons;
                if (this.props.mode == "Edit") {
                    buttons = {
                        button1: buttonFilter,
                        button2: buttonSound,
                        button3: buttonAdd,
                        button4: buttonEdit,
                        button5: buttonDelete
                    };
                }
                else {                 // mode == "Play"
                    buttons = {
                        button1: buttonFilter,
                        button2: buttonSound,
                        button3: buttonShuffle
                    };
                }

                const toolbarInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>
                            {buttons}
                        </ReactBootstrap.ButtonGroup>
                    </div>
                );
                return toolbarInstance;
            }
        });

        return Toolbar;
    });

//var button1 = buttonFilter;
//var button2 = buttonSound;
//var button3 = this.props.mode == "Edit" ? buttonAdd : buttonShuffle;
//var button4 = this.props.mode == "Edit" ? buttonEdit : buttonInfo;
//var button5 = buttonDelete;

//{button1}
//{button2}
//{button3}
//{button4}
//{button5}
