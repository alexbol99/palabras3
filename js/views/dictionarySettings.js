/**
 * Created by alexbol on 6/24/2015.
 */
define(['models/dictionary', 'collections/dictionaries', '../components/confirmPopup'],
    function (Dictionary, dictionaries, ConfirmPopup) {

        var DictionarySettingsComponent = React.createClass({
            getInitialState: function() {
                return {
                    confirmDeletePopup: false
                }
            },
            componentDidMount: function() {
            },
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
                /*
                var confirmDeletePopupInstance = this.state.confirmDeletePopup ? (
                    <ConfirmPopup
                        title = "Are you sure?"
                        message = "message"
                        onConfirm = {this.deleteCategory}
                        onCancel = {this.hideConfirmDeletePopup}
                        hidePopup = {this.hideConfirmDeletePopup}
                    />
                ) : null;
                */
                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title="Dictionary settings" animation={true} onRequestHide={this.props.hidePopup}>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.hidePopup}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        var DictionarySettingsView = Backbone.View.extend({
            initialize: function () {
                this.render();
            },
            hidePopup: function() {
                window.history.back();
            },
            render: function() {
                var dictionarySettingsComponentInstance = (
                    <DictionarySettingsComponent
                        hidePopup = {this.hidePopup}
                    />
                );
                React.render(dictionarySettingsComponentInstance, document.body);
            }
        });

        return DictionarySettingsView;   // new CategoriesView();
    });
