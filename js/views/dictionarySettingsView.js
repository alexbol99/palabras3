/**
 * Created by alexbol on 6/24/2015.
 */
define(['models/app', 'models/dictionary', 'collections/dictionaries', 'collections/languages', '../components/dictionarySettings'],
    function (app, Dictionary, dictionaries, languages, DictionarySettingsComponent) {
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
            deleteDictionary: function() {
                Dictionary.prototype.deleteDictionary(thisView.dictionary);
                thisView.hidePopup();
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
                        deleteDictionary = {this.deleteDictionary}
                    />
                );
                React.render(dictionarySettingsComponentInstance, document.getElementById("page-main"));
            }
        });

        return DictionarySettingsView;   // new CategoriesView();
    });
