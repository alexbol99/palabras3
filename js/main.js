/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/app','models/quiz',
        'jsx!views/categoriesView', 'jsx!views/quizView', 'jsx!views/dictionariesView', 'jsx!views/dictionarySettingsView',
        'models/quizItem', 'models/category', 'models/dictionary',
        'collections/categories','collections/quizItems', 'collections/catlist', 'collections/dictionaries',
        'collections/languages',
        'jsx!components/confirmPopup',
        'jsx!components/quizToolbar', 'jsx!components/itemsListEdit', 'jsx!components/itemsListPlay',
        'jsx!components/itemsFilterPopup', 'jsx!components/infoPopup',
        'jsx!components/mainPanel', 'jsx!components/menu'],
    function (app, quiz, CategoriesView, QuizView, DictionariesView, DictionarySettingsView) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // Configure React's event system to handle touch events on mobile devices.
        React.initializeTouchEvents(true);

        // app.set("currentDictionary", "Class_Alberto_Ru");
        // app.start();         // set dictionary

        var AppRouter = Backbone.Router.extend({

            routes: {
                "": 'home',
                'dictionaries'                                        : 'dictionaries',                  // #dictionaries
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
            dictionaries: function() {
                app.setDictionary(dictionary);
                var dictionaries = new DictionariesView();
            },
            dictionarySettings: function(dictionaryId) {
                // app.setDictionary(dictionary);
                var settings = new DictionarySettingsView(dictionaryId);
            },
            categories: function(dictionary) {
                app.setDictionary(dictionary);
                var categoriesView = new CategoriesView();
            },

            quizDefault: function(dictionary) {
                app.setDictionary(dictionary);
                quiz.set({
                    currentDictionary: dictionary
                });
                quiz.restoreState();
                var quizView = new QuizView();
            },
            quizAll: function(dictionary, numWeeksBefore) {
                app.setDictionary(dictionary);
                quiz.set({
                    currentDictionary: "Class_Alberto_Ru",
                    selectionMode: "all",
                    numWeeksBefore: numWeeksBefore
                });
                var quizView = new QuizView();
            },

            quizSelected: function(dictionary, category) {
                app.setDictionary(dictionary);
                quiz.set({
                    currentDictionary: "Class_Alberto_Ru",
                    selectionMode: "selected",
                    selectedCategory: category
                });
                var quizView = new QuizView();
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


