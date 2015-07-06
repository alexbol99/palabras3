/**
 * Created by Owner on 6/19/15.
 */
define(['models/fb', 'models/dictionary', 'collections/dictionaries', 'jsx!components/dictionariesList'],
    function (fb, Dictionary, dictionaries, DictionariesListComponent) {
        var DictionariesView = Backbone.View.extend({
            initialize: function () {
                dictionaries.off();
                dictionaries.on("sync", this.render, this);
                dictionaries.sync();
            },
            logOut: function() {
                // fb.logout();
                var link = '#logout';
                window.location.href = link;
            },
            addNewDictionary: function (event) {
                var dictionary = Dictionary.prototype.createEmptyDictionary();
                // set createdBy user attribute
                // then redirect to edit properties page
                dictionary.set({
                    "createdBy": fb.currentUser()
                });
                dictionary.save().then(function (dictionary) {
                    dictionaries.addDictionary(dictionary);      // add to the collection
                    var link = '#dictionaries/' + dictionary.id;
                    window.location.href = link;
                });
            },
            startQuiz: function (event) {
                var dictionary = _.findWhere(dictionaries.models, {"id": event.currentTarget.id});
                if (dictionary) {
                    var link = '#quiz/' + event.currentTarget.id; // dictionary.get('name');
                }
                window.location.href = link;
            },
            editSettings: function (event) {
                event.stopPropagation();
                var link = '#dictionaries/' + event.currentTarget.id;
                window.location.href = link;
            },
            shareDictionary: function(event) {
                fb.share(event.currentTarget.id);
            },
            render: function () {
                var dictionariesManagerComponentInstance = (
                    <DictionariesListComponent
                        dictionaries={dictionaries}
                        startQuiz={this.startQuiz}
                        onEditSettingsClicked={this.editSettings}
                        onShareDictionaryClicked={this.shareDictionary}
                        addNewDictionary={this.addNewDictionary}
                        onLogOutClicked={this.logOut}
                    />
                );
                React.render(dictionariesManagerComponentInstance, document.getElementById("page-main"));
            }
        });

        return DictionariesView;   // new CategoriesView();
    });
