/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/app','models/quiz', 'collections/dictionaries',
        'jsx!views/categoriesView', 'jsx!views/quizView', 'jsx!views/dictionariesView', 'jsx!views/dictionarySettingsView',
        'models/quizItem', 'models/category', 'models/dictionary',
        'collections/categories','collections/quizItems', 'collections/catlist',
        'collections/languages',
        'jsx!components/confirmPopup',
        'jsx!components/quizToolbar', 'jsx!components/itemsListEdit', 'jsx!components/itemsListPlay',
        'jsx!components/itemsFilterPopup', 'jsx!components/infoPopup',
        'jsx!components/mainPanel', 'jsx!components/menu'],
    function (app, quiz, dictionaries, CategoriesView, QuizView, DictionariesView, DictionarySettingsView) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // Configure React's event system to handle touch events on mobile devices.
        React.initializeTouchEvents(true);

        var AppRouter = Backbone.Router.extend({

            routes: {
                "": 'home',
                'dictionaries'                                        : 'dictionariesList',                  // #dictionaries
                'dictionaries/:dictionaryId'                          : 'dictionarySettings',            // #dictionaries/Class_Alberto_Ru - settings
                'categories/:dictionary'                              : 'categories',                    // #categories/Class_Alberto_ru
                'quiz/:dictionary'                                    : 'quizDefault',                   // #quiz/Class_Alberto_ru
                'quiz/all/:dictionary/(:numWeeksBefore)'              : 'quizAll',                       // #quiz/all/Class_Alberto_ru/2
                'quiz/selected/:dictionary/(:category)'               : 'quizSelected',                  // #quiz/selected/Class_Alberto_ru/verbos regulares
                '*default': 'default'
            },

            home: function() {
                var dictionaries = new DictionariesView();
            },
            dictionariesList: function() {
                var dictionariesView = new DictionariesView();
            },
            dictionarySettings: function(dictionaryId) {
                dictionaries.find(dictionaryId).then( function(dictionary) {
                    var settingsView = new DictionarySettingsView(dictionary);
                });
            },
            categories: function(dictionaryId) {
                dictionaries.find(dictionaryId).then( function(dictionary) {
                    app.setDictionary(dictionary);
                    var categoriesView = new CategoriesView();
                });
            },

            quizDefault: function(dictionaryId) {
                dictionaries.find(dictionaryId).then( function(dictionary) {
                    app.setDictionary(dictionary);
                    /* temporary: start in "all" mode, do not keep category in storage */
                    quiz.set({
                        selectionMode: "all",
                        numWeeksBefore: 2
                    });
                    // quiz.restoreState();
                    var quizView = new QuizView();
                });
            },
            quizAll: function(dictionaryId, numWeeksBefore) {
                dictionaries.find(dictionaryId).then( function(dictionary) {
                    app.setDictionary(dictionary);
                    quiz.set({
                        selectionMode: "all",
                        numWeeksBefore: numWeeksBefore
                    });
                    var quizView = new QuizView();
                });
            },

            quizSelected: function(dictionaryId, category) {
                dictionaries.find(dictionaryId).then( function(dictionary) {
                    app.setDictionary(dictionary);
                    quiz.set({
                        selectionMode: "selected",
                        selectedCategory: category || ''
                    });
                    var quizView = new QuizView();
                });
            },

            default : function(params) {
                console.log("we are here");
            }

        });

        //define our new instance of router
        var appRouter = new AppRouter();

        // without History API
        Backbone.history.start({pushState: false});

    });


