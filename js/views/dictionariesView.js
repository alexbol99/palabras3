/**
 * Created by Owner on 6/19/15.
 */
define(['models/dictionary', 'collections/dictionaries', '../components/confirmPopup'],
    function (Dictionary, dictionaries, ConfirmPopup) {

        var DictionariesManagerComponent = React.createClass({
            getInitialState: function() {
                return {
                    dictionaries: dictionaries,
                    selectedItemId: undefined,
                    editSelectedItem: false,
                    confirmDeletePopup: false
                }
            },
            componentDidMount: function() {
                dictionaries.off();
                dictionaries.on("sync", function() {
                    this.setState({
                        dictionaries: dictionaries
                    });
                }, this);
            },
/*
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
*/
            /* "Are you sure" (confirm delete category) Popup callbacks */
/*
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
*/

            render() {
                /* "Are you sure?" Popup definition */
/*
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
*/
                var confirmDeletePopupInstance = this.state.confirmDeletePopup ? (
                    <ConfirmPopup
                        title = "Are you sure?"
                        message = "message"
                        onConfirm = {this.deleteCategory}
                        onCancel = {this.hideConfirmDeletePopup}
                        hidePopup = {this.hideConfirmDeletePopup}
                    />
                ) : null;

                var list = this.state.dictionaries.map(function (dictionary) {
                    var bsStyle = dictionary.id == this.state.selectedItemId ? 'success' : 'info';

                    var buttonRemoveInstance = (dictionary.id == this.state.selectedItemId && !this.state.editSelectedItem) ? (
                        <span id={dictionary.id}>
                            <ReactBootstrap.Glyphicon glyph='remove-sign' title="delete item" onClick={this.raiseConfirmDeletePopup} />
                        </span>
                    ) : null;

                    var dictionaryInstance = (dictionary.id == this.state.selectedItemId && this.state.editSelectedItem) ? (
                        <ReactBootstrap.Input type="text" defaultValue={dictionary.get('name')}  name='name' id={dictionary.id} onChange={this.onNameChanged} />
                    ) : (
                        <h4 id={dictionary.id} onClick={this.props.startQuiz}>{dictionary.get('name')}</h4>
                    );

                    var buttonSettingsInstance = (
                        <span id={dictionary.id} onClick={this.props.editSettings}>
                            <ReactBootstrap.Glyphicon glyph='cog' title="settings" style={{fontSize: "1.4em"}} />
                        </span>
                    );

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle={bsStyle} key={dictionary.cid} >
                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid' id={dictionary.id} >
                                    <ReactBootstrap.Col xs={10} md={10}>
                                        {dictionaryInstance}
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col xs={2} md={2}>
                                        {buttonSettingsInstance}
                                    </ReactBootstrap.Col>
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>
                        </ReactBootstrap.ListGroupItem>
                    )
                }, this);

                return (
                    <ReactBootstrap.Panel>
                        <div className='modal-header'>
                            <h4>My dictionaries</h4>
                        </div>
                        <div className='modal-body' style={{height:'72vh', overflowY:'auto', overflowX:'hidden'}}>
                            {confirmDeletePopupInstance}

                            <ReactBootstrap.ListGroup>
                                {list}
                            </ReactBootstrap.ListGroup>

                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.ButtonGroup style={{width:"100%"}}>
                                <ReactBootstrap.Button bsStyle='info' bsSize='large' block title="Add new dictionary" style={{textAlign:"left"}} onClick={this.props.addNewDictionary}>
                                    <ReactBootstrap.Glyphicon glyph='plus-sign' style={{fontSize: "1.4em"}} />
                                    &nbsp;&nbsp;
                                    Add new dictionary
                                </ReactBootstrap.Button>
                            </ReactBootstrap.ButtonGroup>
                        </div>
                    </ReactBootstrap.Panel>
                );
            }
        });

        var DictionariesView = Backbone.View.extend({
            initialize: function () {
                dictionaries.off();
                dictionaries.on("sync", this.render, this);
                dictionaries.sync();
            },
            addNewDictionary: function(event) {
                var dictionary = new Dictionary();
                // set createdBy user attribute
                // then redirect to edit properties page
                dictionary.save().then( function(dictionary) {
                    dictionaries.addDictionary(dictionary);      // add to the collection
                    var link = '#dictionaries/' + dictionary.id;
                    window.location.href = link;
                });
            },
            startQuiz: function(event) {
                var dictionary = _.findWhere(dictionaries.models, {"id": event.currentTarget.id});
                if (dictionary) {
                    var link = '#quiz/' + event.currentTarget.id; // dictionary.get('name');
                }
                window.location.href = link;
            },
            editSettings: function(event) {
                event.stopPropagation();
                var link = '#dictionaries/' + event.currentTarget.id;
                window.location.href = link;
            },
            render: function() {
                var dictionariesManagerComponentInstance = (
                    <DictionariesManagerComponent
                        startQuiz={this.startQuiz}
                        editSettings={this.editSettings}
                        addNewDictionary={this.addNewDictionary}
                    />
                );
                React.render(dictionariesManagerComponentInstance, document.body);
            }
        });

        return DictionariesView;   // new CategoriesView();
    });

/*
<ReactBootstrap.ButtonGroup justified>
                                {buttons}
</ReactBootstrap.ButtonGroup>
*/
