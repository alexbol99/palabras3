/**
 * Created by alexbol on 1/8/2015.
 */
define(['collections/dictionaries', 'models/quizItem', 'models/category'],
    function (dictionaries, QuizItem, Category) {
        var App = Backbone.Model.extend({
            defaults: {
                currentDictionary: null
            },
            initialize: function () {
                Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");
                window.addEventListener('orientationchange', function(event) {
                    location.reload();
                }, false);
            },
            setDictionary: function(dictionary) {
                QuizItem.prototype.className = dictionary.id;             // "Class_Alberto_Ru";
                Category.prototype.className = dictionary.id + "_Cat";    // "Class_Alberto_Ru" + "_Cat";
                // this.set("currentDictionaryName", dictionary.get('name'));
                this.set("currentDictionary", dictionary);
            },
            addEmptyDictionary: function() {

            }
        });
        return new App();
    });