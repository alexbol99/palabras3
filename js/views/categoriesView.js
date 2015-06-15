/**
 * Created by Owner on 6/11/15.
 */
define(['models/quiz', 'models/quizItem', 'models/category', 'collections/catlist', '../components/confirmPopup'],
    function (quiz, QuizItem, Category, catList, ConfirmPopup) {
        var CategoriesManagerComponent = React.createClass({
            getInitialState: function() {
                return {
                    categories: catList,
                    selectedItemId: undefined,
                    editSelectedItem: false,
                    confirmDeletePopup: false
                }
            },
            componentDidMount: function() {
                catList.off();
                catList.on("sync", function() {
                    this.setState({
                        categories: catList
                    });
                }, this);
            },

            toggleSelected: function(event) {
                var id = event.currentTarget.id;
                this.setState({
                    selectedItemId:
                        (this.state.selectedItemId != undefined && this.state.selectedItemId == id && !this.state.editSelectedItem) ? undefined : id
                });
            },
            addButtonClicked: function(event) {
                var category = new Category();
                var self = this;
                category.save().then(function (category) {
                    var newCatList = catList.addEmpty(category);
                    self.setState({
                        categories: newCatList,
                        selectedItemId: category.id,
                        editSelectedItem: true
                    });
                })
            },
            toggleEditCategory: function(event) {
                this.setState({
                    editSelectedItem: this.state.editSelectedItem ? false : true
                });
            },
            onCategoryChanged: function(event) {
                var id = event.target.id;
                var category = _.findWhere(this.state.categories.models, {"id": id});
                var oldCategoryName = category.get("category");
                var newCategoryName = event.target.value;
                category.set('category', newCategoryName);
                category.save().then( function() {

                    // update all items in renamed category
                    var query = new Parse.Query(QuizItem);
                    query.equalTo("category", oldCategoryName);
                    query.find().then( function(items) {
                        items.forEach(function(item) {
                            item.set('category', newCategoryName);
                            item.save();
                        })
                    });

                });
            },
            deleteCategory: function(event) {
                var category = _.findWhere(this.state.categories.models, {"id": this.state.selectedItemId});
                var self = this;
                // delete category
                category.destroy().then( function(category) {

                    // delete all items in deleted category
                    var query = new Parse.Query(QuizItem);
                    query.equalTo("category", category.get("category"));
                    query.find().then( function(items) {
                        items.forEach(function(item) {
                            item.destroy();
                        })
                    });

                    var newCatList = catList.clone();
                    newCatList.remove(category);

                    self.setState({
                        categories: newCatList,
                        selectedItemId: undefined,
                        editSelectedItem: false,
                        confirmDeletePopup: false
                    });
                });
            },

            /* "Are you sure" (confirm delete category) Popup callbacks */

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


            render() {
                /* "Are you sure?" Popup definition */
                var item;
                if (this.state.selectedItemId) {
                    item = _.findWhere(this.state.categories.models, {"id": this.state.selectedItemId});
                }
                var messageInstance = this.state.selectedItemId ? (
                    <h4>
                        All items in category&nbsp;
                        <span><b><i>{item.get('category')}</i></b></span>
                        &nbsp;will be deleted
                    </h4>
                ) : null;

                var confirmDeletePopupInstance = this.state.confirmDeletePopup ? (
                    <ConfirmPopup
                        title = "Are you sure?"
                        message = {messageInstance}
                        onConfirm = {this.deleteCategory}
                        onCancel = {this.hideConfirmDeletePopup}
                        hidePopup = {this.hideConfirmDeletePopup}
                    />
                ) : null;

                var buttonAdd = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Add item or category" onClick={this.addButtonClicked} >
                            <ReactBootstrap.Glyphicon glyph='plus' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                var buttonEdit = (
                    <ReactBootstrap.ButtonGroup>
                        <ReactBootstrap.Button bsStyle='primary' bsSize='large' title="Edit item" onClick={this.toggleEditCategory} >
                            <ReactBootstrap.Glyphicon glyph='pencil' />
                        </ReactBootstrap.Button>
                    </ReactBootstrap.ButtonGroup>
                );

                var buttons;
                buttons = {
                    button1: buttonAdd,
                    button2: buttonEdit
                };

                const toolbarInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>
                            {buttons}
                        </ReactBootstrap.ButtonGroup>
                    </div>
                );

                var list = this.state.categories.map(function (cat) {
                    var bsStyle = cat.id == this.state.selectedItemId ? 'success' : 'info';

                    var buttonRemoveInstance = (cat.id == this.state.selectedItemId && !this.state.editSelectedItem) ? (
                        <span id={cat.id}>
                            <ReactBootstrap.Glyphicon glyph='remove-sign' title="delete item" onClick={this.raiseConfirmDeletePopup} />
                        </span>
                    ) : null;

                    var categoryInstance = (cat.id == this.state.selectedItemId && this.state.editSelectedItem) ? (
                        <ReactBootstrap.Input type="text" defaultValue={cat.get('category')}  name='category' id={cat.id} onChange={this.onCategoryChanged} />
                    ) : (
                        <h4>{cat.get('category')}</h4>
                    );

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle={bsStyle} key={cat.cid} >
                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid' id={cat.id} onClick={this.toggleSelected}  >
                                    <ReactBootstrap.Col xs={10} md={10}>
                                        {categoryInstance}
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col xs={2} md={2}>
                                        {buttonRemoveInstance}
                                    </ReactBootstrap.Col>
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>
                        </ReactBootstrap.ListGroupItem>
                    )
                }, this);

                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title="Categories" animation={true}
                        onRequestHide={this.props.hidePopup}>
                        <div className='modal-body'>
                            {confirmDeletePopupInstance}

                            <ReactBootstrap.ButtonGroup justified>
                                {buttons}
                            </ReactBootstrap.ButtonGroup>

                            <ReactBootstrap.ListGroup>
                                {list}
                            </ReactBootstrap.ListGroup>
                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.hidePopup}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        var CategoriesView = Backbone.View.extend({
            initialize: function () {
                catList.off();
                catList.on("sync", this.render, this);
                catList.sync();
            },
            hidePopup: function() {
                window.history.back();
            },
            render: function() {
                var categoriesManagerComponentInstance = (
                    <CategoriesManagerComponent
                        hidePopup={this.hidePopup}
                    />
                );
                React.render(categoriesManagerComponentInstance, document.body);
            }
        });

        return CategoriesView;   // new CategoriesView();
    });

