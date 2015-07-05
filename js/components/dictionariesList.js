/**
 * Created by alexbol on 6/29/2015.
 */
define([],
    function () {

        var DictionariesListComponent = React.createClass({
            getInitialState: function() {
                return {
                    // dictionaries: dictionaries
                }
            },
            componentDidMount: function() {
                //dictionaries.off();
                //dictionaries.on("sync", function() {
                //    this.setState({
                //        dictionaries: dictionaries
                //    });
                //}, this);
            },

            render() {
                var list = this.props.dictionaries.map(function (dictionary) {
                    dictionary = dictionary.get('dictionary') || dictionary;

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
                    <ReactBootstrap.Panel bsSize='large' bsStyle='warning'>
                        <ReactBootstrap.Button bsStyle='default' bsSize='small' title="Logout" onClick={this.props.onLogOutClicked}>Log out</ReactBootstrap.Button>
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
                    </ReactBootstrap.Panel>
                );
            }
        });

        return DictionariesListComponent;
    });

