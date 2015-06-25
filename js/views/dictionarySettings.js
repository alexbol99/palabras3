/**
 * Created by alexbol on 6/24/2015.
 */
define(['models/app', 'models/dictionary', 'collections/dictionaries', '../components/confirmPopup'],
    function (app, Dictionary, dictionaries, ConfirmPopup) {

        var DictionarySettingsComponent = React.createClass({
            getInitialState: function() {
                return {
                    confirmDeletePopup: false
                }
            },
            componentDidMount: function() {
            },

            render() {
                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title="Dictionary settings" animation={true} onRequestHide={this.props.hidePopup}>
                        <div className='modal-body'>
                            <ReactBootstrap.Input bsSize="large" type="text" label="Name" defaultValue={this.props.dictionary.get('name')}  name='name'
                                autocomplete="off" autocorrect="off" autocapitalize="off" onChange={this.props.onDictionaryNameChanged} />
                            <ReactBootstrap.Input bsSize="large" type="text" label="Language 1" defaultValue={this.props.dictionary.get('language1').get('Name')}  name='languageName1'
                                autocomplete="off" autocorrect="off" autocapitalize="off" onChange={this.props.onDictionaryNameChanged} />
                            <ReactBootstrap.Input bsSize="large" type="text" label="Language 2" defaultValue={this.props.dictionary.get('language2').get('Name')}  name='languageName2'
                                autocomplete="off" autocorrect="off" autocapitalize="off" onChange={this.props.onDictionaryNameChanged} />

                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.hidePopup}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        var DictionarySettingsView = Backbone.View.extend({
            initialize: function (dictionaryId) {
                this.id = dictionaryId;
                this.dictionary =  _.findWhere(dictionaries.models, {"id": this.id});
                this.render();
            },
            hidePopup: function() {
                window.history.back();
            },
            changeDictionaryName: function() {
                // Table cannot be altered */
            },
            render: function() {
                var dictionarySettingsComponentInstance = (
                    <DictionarySettingsComponent
                        dictionary = {this.dictionary}
                        hidePopup = {this.hidePopup}
                        onDictionaryNameChanged = {this.changeDictionaryName}
                    />
                );
                React.render(dictionarySettingsComponentInstance, document.body);
            }
        });

        return DictionarySettingsView;   // new CategoriesView();
    });
