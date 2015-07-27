/**
 * Created by Owner on 6/28/15.
 */
define(['../components/confirmPopup'],
    function (ConfirmPopup) {

        var DictionarySettings = React.createClass({
            getInitialState: function() {
                return {
                    confirmDeletePopup: false
                }
            },
            componentDidMount: function() {
            },
            raiseConfirmDeletePopup: function(event) {
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
                var options = this.props.languages.map(function (language) {
                    return (
                        <option value={language.get('name')} key={language.get('name')} >
                            {language.get('localName')}
                        </option>
                    )
                });

                var languageDefault1 = this.props.dictionary.get('language1') ? this.props.dictionary.get('language1').get('name') : '';
                var languageDefault2 = this.props.dictionary.get('language2') ? this.props.dictionary.get('language2').get('name') : '';

                var linkToCategories = '#categories/' + this.props.dictionary.id;
                var linkToQuiz = '#quiz/' + this.props.dictionary.id;

                /* "Are you sure?" Popup definition */
                var messageInstance = (
                    <h4>
                        Dictionary&nbsp;
                        <span><b><i>{this.props.dictionary.get('name')}</i></b></span>
                    &nbsp;and all its items will be deleted
                    </h4>
                );

                var confirmDeletePopupInstance = this.state.confirmDeletePopup ? (
                    <ConfirmPopup
                        title = "Are you sure?"
                        message = {messageInstance}
                        onConfirm = {this.props.deleteDictionary}
                        onCancel = {this.hideConfirmDeletePopup}
                        hidePopup = {this.hideConfirmDeletePopup}
                    />
                ) : null;

                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title="Dictionary settings" animation={true} onRequestHide={this.props.hidePopup}>
                        {confirmDeletePopupInstance}
                        <div className='modal-body'>

                                <ReactBootstrap.Input bsSize="large" type="text" label="Name" defaultValue={this.props.dictionary.get('name')}  name='name'
                                    autocomplete="off" autocorrect="off" autocapitalize="off" onChange={this.props.onDictionaryNameChanged} />

                                <ReactBootstrap.Input bsSize="large" type='select' label='Language 1' defaultValue={languageDefault1} name='language1'
                                    onChange={this.props.onLanguage1Selected}>
                                    {options}
                                </ReactBootstrap.Input>

                                <ReactBootstrap.Input bsSize="large" type='select' label='Language 2' defaultValue={languageDefault2} name='language2'
                                    onChange={this.props.onLanguage2Selected}>
                                    {options}
                                </ReactBootstrap.Input>

                                <ReactBootstrap.ButtonGroup style={{width:"100%"}}>
                                    <ReactBootstrap.Button bsStyle='default' bsSize='large' block title="Edit categories" style={{textAlign:"left"}} href={linkToCategories}>
                                        <ReactBootstrap.Glyphicon glyph='list-alt' style={{fontSize: "1em"}} />
                                    &nbsp;&nbsp;
                                        Edit categories ...
                                    </ReactBootstrap.Button>
                                </ReactBootstrap.ButtonGroup>


                            <br />
                            <br />
                            <br />

                            <ReactBootstrap.Panel header="Dangerous operation">
                                <ReactBootstrap.Button bsStyle='warning' bsSize='large' block title="Delete this dictionary" style={{textAlign:"left"}} onClick={this.raiseConfirmDeletePopup} >
                                    <ReactBootstrap.Glyphicon glyph='trash' style={{fontSize: "1em"}} />
                                &nbsp;&nbsp;
                                    Delete this dictionary
                                </ReactBootstrap.Button>
                            </ReactBootstrap.Panel>

                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.hidePopup}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        return DictionarySettings;
    });

//<ReactBootstrap.ButtonGroup style={{width:"100%"}}>
//    <ReactBootstrap.Button bsStyle='link' bsSize='large' block title="Go to dictionary" style={{textAlign:"left"}} href={linkToQuiz}>
//        <ReactBootstrap.Glyphicon glyph='education' style={{fontSize: "1em"}} />
//    &nbsp;&nbsp;
//        Go to dictionary
//    </ReactBootstrap.Button>
//</ReactBootstrap.ButtonGroup>
//
//
