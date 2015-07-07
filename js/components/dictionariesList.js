/**
 * Created by alexbol on 6/29/2015.
 */
define([],
    function () {

        var DictionariesListComponent = React.createClass({
            getInitialState: function() {
                return {
                    fb: null,
                    name: "",
                    picture: ""
                }
            },
            componentDidMount: function() {
                var fb = this.props.observe;
                this.setState({
                    fb: fb,
                    name: fb.get("name"),
                    picture: fb.get("picture")
                },function() {
                        this.state.fb.on("change:name change:picture", function () {
                            this.setState({
                                name: this.state.fb.get("name"),
                                picture: this.state.fb.get("picture")
                            })
                        }, this);
                    }
                );
            },
            render() {
                var list = this.props.dictionaries.map(function (dictionary) {
                    dictionary = dictionary.get('dictionary') || dictionary;

                    var bsStyle = 'info';

                    var dictionaryInstance = (
                        <h4 id={dictionary.id} onClick={this.props.startQuiz}>{dictionary.get('name')}</h4>
                    );

                    var buttonSettingsInstance = (
                        <span id={dictionary.id} onClick={this.props.onEditSettingsClicked}>
                            <ReactBootstrap.Glyphicon glyph='cog' title="settings" style={{fontSize: "1.4em"}} />
                        </span>
                    );

                    var buttonShareInstance = (
                        <span id={dictionary.id} onClick={this.props.onShareDictionaryClicked}>
                            <ReactBootstrap.Glyphicon glyph='share' title="settings" style={{fontSize: "1.4em"}} />
                        </span>
                    );

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle={bsStyle} key={dictionary.cid} >
                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid' id={dictionary.id} >
                                    <ReactBootstrap.Col xs={8} md={8}>
                                        {dictionaryInstance}
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col xs={2} md={2}>
                                        {buttonSettingsInstance}
                                    </ReactBootstrap.Col>
                                    <ReactBootstrap.Col xs={2} md={2}>
                                        {buttonShareInstance}
                                    </ReactBootstrap.Col>
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>
                        </ReactBootstrap.ListGroupItem>
                    )
                }, this);

                return (
                    <ReactBootstrap.Panel bsSize='large' bsStyle='warning'>

                        <ReactBootstrap.Grid>
                            <ReactBootstrap.Row className='show-grid'>

                                <ReactBootstrap.Col xs={3} md={3}>
                                    <img src={this.state.picture} title="userpic" alt="userpic" className="img-circle"/>
                                </ReactBootstrap.Col>

                                <ReactBootstrap.Col xs={6} md={6}>
                                    {this.state.name}
                                </ReactBootstrap.Col>

                                <ReactBootstrap.Col xs={3} md={3}>
                                    <ReactBootstrap.Button bsStyle='default' bsSize='small' title="Logout" onClick={this.props.onLogOutClicked}>Log out</ReactBootstrap.Button>
                                </ReactBootstrap.Col>

                            </ReactBootstrap.Row>
                        </ReactBootstrap.Grid>

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

