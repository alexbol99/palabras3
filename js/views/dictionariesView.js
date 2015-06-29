/**
 * Created by Owner on 6/19/15.
 */
define(['models/dictionary', 'collections/dictionaries'],
    function (Dictionary, dictionaries) {

        var DictionariesManagerComponent = React.createClass({
            getInitialState: function() {
                return {
                    dictionaries: dictionaries
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

            render() {
                var list = this.state.dictionaries.map(function (dictionary) {
                    var bsStyle = 'info';

                    var buttonSettingsInstance = (
                        <span id={dictionary.id} onClick={this.props.editSettings}>
                            <ReactBootstrap.Glyphicon glyph='cog' title="settings" style={{fontSize: "1.4em"}} />
                        </span>
                    );

                    var dictionaryInstance = (
                        <h4 id={dictionary.id} onClick={this.props.startQuiz}>{dictionary.get('name')}</h4>
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
                    <ReactBootstrap.Panel header={'My dictionaries'} bsSize='large' bsStyle='warning'>
                        <div className='modal-body' style={{height:'72vh', overflowY:'auto', overflowX:'hidden'}}>
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
                var dictionary = Dictionary.prototype.createEmptyDictionary(); //  new Dictionary();
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
