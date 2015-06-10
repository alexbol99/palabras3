/**
 * Created by Owner on 5/9/15.
 */

define(['components/confirmPopup'],
    function (ConfirmPopup) {
        var ItemsListEdit = React.createClass({
            getInitialState: function () {
                return {
                    confirmDeletePopup: false
                }
            },
            raiseConfirmDeletePopup: function(event) {
                event.stopPropagation();
                this.setState({
                    confirmDeletePopup: true
                });
            },
            hideConfirmDeletePopup: function(event) {
                this.setState({
                    confirmDeletePopup: false
                });
            },
            confirmAndHideConfirmPopup: function(event) {
                this.setState({
                    confirmDeletePopup: false
                });
                this.props.onConfirmDeleteItem();
            },
            render: function() {
                var langLeft = "spanish";
                var langRight = "russian";

                var options = this.props.categories.map(function (item) {
                    return (
                        <option bsStyle='success' value={item.get('category')} key={item.get('category')}>
                            {item.get('category') + " (" + item.get('count') + ')'}
                        </option>
                    )
                });

                var item;
                var message = "";
                if (this.props.selectedItemId) {
                    item = _.findWhere(this.props.items.models, {"id": this.props.selectedItemId});
                    message = "Item " + item.get(langLeft) + " will be deleted";
                }

                var confirmDeletePopupInstance = this.state.confirmDeletePopup ? (
                    <ConfirmPopup
                        title = "Are you sure?"
                        message = {message}
                        onConfirm = {this.confirmAndHideConfirmPopup}
                        onCancel = {this.hideConfirmDeletePopup}
                        hidePopup = {this.hideConfirmDeletePopup}
                    />
                ) : null;

                var self = this;
                var list = this.props.items.map(function (item) {

                    var buttonRemoveInstance = (item.id == this.props.selectedItemId && !this.props.editSelectedItem) ? (
                        <ReactBootstrap.Col xs={1} md={1}>
                            <span bsSize='small' id={item.id}>
                                <ReactBootstrap.Glyphicon glyph='remove-sign' title="delete item" onClick={self.raiseConfirmDeletePopup} />
                            </span>
                        </ReactBootstrap.Col>
                    ) : null;

                    var itemLeftInstance = (item.id == this.props.selectedItemId && this.props.editSelectedItem) ? (
                        <ReactBootstrap.Col xs={4} md={4}>
                            <ReactBootstrap.Input bsSize="small"  type="text" defaultValue={item.get(langLeft)}  name={langLeft} id={item.id} onChange={this.props.onItemChanged} />
                        </ReactBootstrap.Col>
                    ) : (
                        <ReactBootstrap.Col xs={4} md={4}>
                            <h4>{item.get(langLeft)}</h4>
                        </ReactBootstrap.Col>
                    );

                    var itemRightInstance = (item.id == this.props.selectedItemId && this.props.editSelectedItem) ? (
                        <ReactBootstrap.Col xs={4} md={4}>
                            <ReactBootstrap.Input bsSize="small" type="text" defaultValue={item.get(langRight)}  name={langRight} id={item.id} onChange={this.props.onItemChanged} />
                        </ReactBootstrap.Col>
                    ) : (
                        <ReactBootstrap.Col xs={4} md={4}>
                            <h4>{item.get(langRight)}</h4>
                        </ReactBootstrap.Col>
                    );

                    var categorySelectInstance = (item.id == this.props.selectedItemId && this.props.editSelectedItem) ? (
                        <ReactBootstrap.Col xs={2} md={2}>
                        <ReactBootstrap.Input type='select' bsSize="small" defaultValue={item.get("category")}  ref={item.id} id={item.id} onChange={this.props.onCategoryChanged}>
                            {options}
                        </ReactBootstrap.Input>
                        </ReactBootstrap.Col>
                    ) : null;

                    var buttonSayItInstance = (
                        <ReactBootstrap.Col xs={1} md={1}>
                            <span bsSize='small' id={item.id} title="say it" onClick={this.props.onClickSayItButton}>
                                <ReactBootstrap.Glyphicon glyph='volume-up' />
                            </span>
                        </ReactBootstrap.Col>
                    );
                    var buttonGlobeInstance = (
                        <ReactBootstrap.Col xs={1} md={1}>
                            <span bsSize='small' id={item.id} title="more info ..." onClick={this.props.onClickGlobeButton}>
                                <ReactBootstrap.Glyphicon glyph='globe' />
                            </span>
                        </ReactBootstrap.Col>
                    );

                    var gridColumns;
                    gridColumns = React.addons.createFragment({
                        buttonRemoveInstance: buttonRemoveInstance,
                        itemLeftInstance: itemLeftInstance,
                        itemRightInstance: itemRightInstance,
                        categorySelectInstance: categorySelectInstance,
                        buttonSayItInstance: buttonSayItInstance,
                        buttonGlobeInstance: buttonGlobeInstance
                    });

                    var bsStyle = item.id == this.props.selectedItemId ? 'success' : 'info';

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle={bsStyle} key={item.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid' id={item.id} onClick={this.props.onItemClick}>
                                    {gridColumns}
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>

                        </ReactBootstrap.ListGroupItem>
                    )
                }, this);
                return (
                    <div>
                        {confirmDeletePopupInstance}
                        <ReactBootstrap.ListGroup>
                            {list}
                        </ReactBootstrap.ListGroup>
                    </div>
                );
            }
        });

        return ItemsListEdit;
    });

/*<ReactBootstrap.Glyphicon glyph='remove' />*/
/*,
 buttonSayItInstance: buttonSayItInstance,
 buttonGlobeInstance: buttonGlobeInstance*/