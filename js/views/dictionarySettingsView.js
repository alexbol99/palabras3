/**
 * Created by alexbol on 6/24/2015.
 */
define(['models/app', 'collections/dictionaries', 'collections/languages', '../components/confirmPopup'],
    function (app, dictionaries, languages, ConfirmPopup) {

        var DictionarySettingsComponent = React.createClass({
            getInitialState: function() {
                return {
                    confirmDeletePopup: false
                }
            },
            componentDidMount: function() {
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

                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title="Dictionary settings" animation={true} onRequestHide={this.props.hidePopup}>
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
                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.hidePopup}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        var thisView;
        var DictionarySettingsView = Backbone.View.extend({
            initialize: function (dictionary) {
                thisView = this;
                thisView.dictionary = dictionary;
                thisView.render();
            },
            hidePopup: function() {
                window.history.back();
            },
            changeDictionaryName: function(event) {
                thisView.dictionary.set({
                    name: event.target.value
                });
                thisView.dictionary.save();
            },
            changeLanguage1: function(event) {
                console.log(event.target.value);
                var language = languages.find(event.target.value);
                thisView.dictionary.set({
                    language1: language
                });
                thisView.dictionary.save();
            },
            changeLanguage2: function(event) {
                console.log(event.target.value);
                var language = languages.find(event.target.value);
                thisView.dictionary.set({
                    language2: language
                });
                thisView.dictionary.save();
            },
            render: function() {
                var dictionarySettingsComponentInstance = (
                    <DictionarySettingsComponent
                        dictionary = {this.dictionary}
                        languages = {languages}
                        hidePopup = {this.hidePopup}
                        onDictionaryNameChanged = {this.changeDictionaryName}
                        onLanguage1Selected = {this.changeLanguage1}
                        onLanguage2Selected = {this.changeLanguage2}
                    />
                );
                React.render(dictionarySettingsComponentInstance, document.body);
            }
        });

        return DictionarySettingsView;   // new CategoriesView();
    });
