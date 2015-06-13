/**
 * Created by alexbol on 1/8/2015.
 */
define(['models/quizItem', 'models/category'],
    function (QuizItem, Category) {
        var App = Backbone.Model.extend({
            defaults: {
                currentDictionary: ""
            },
            initialize: function () {
                Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");
                window.addEventListener('orientationchange', function(event) {
                    location.reload();
                }, false);
            },
            start: function() {
                QuizItem.prototype.className = "Class_Alberto_Ru";
                Category.prototype.className = "Class_Alberto_Ru" + "_Cat";
            }
        });
        return new App();
    });