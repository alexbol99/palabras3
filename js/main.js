/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    /*urlArgs: "bust=" + (new Date()).getTime()*/
});
require(['models/fb','models/app','models/quiz', 'collections/dictionaries',
        'models/share',
        'views/loginView', 'views/categoriesView', 'views/quizView', 'views/dictionariesView', 'views/dictionarySettingsView',
        'models/quizItem', 'models/category', 'models/dictionary',
        'collections/categories','collections/quizItems', 'collections/catlist',
        'collections/languages',
        'components/confirmPopup',
        'components/quizToolbar', 'components/itemsListEdit', 'components/itemsListPlay',
        'components/itemsFilterPopup', 'components/infoPopup',
        'components/mainPanel', 'components/menu',
        'components/dictionariesList',
        'components/dictionarySettings',
        'components/fbLogin'],
    function (fb, app, quiz, dictionaries, Share, LoginView, CategoriesView, QuizView, DictionariesView, DictionarySettingsView) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // Configure React's event system to handle touch events on mobile devices.
        React.initializeTouchEvents(true);

        var AppRouter = Backbone.Router.extend({

            routes: {
                "": 'home',
                'logout'                                    : 'logOut',                        // #logOut
                'dictionaries'                              : 'dictionariesList',              // #dictionaries
                'dictionaries/:dictionaryId'                : 'dictionarySettings',            // #dictionaries/zqJ2qURY8o - settings
                'share/:dictionaryId'                       : 'dictionaryShare',               // #dictionaries/share/zqJ2qURY8o
                'categories/:dictionaryId'                  : 'categories',                    // #categories/zqJ2qURY8o
                'quiz/:dictionaryId'                        : 'quizDefault',                   // #quiz/zqJ2qURY8o
                'quiz/all/:dictionaryId/(:numWeeksBefore)'  : 'quizAll',                       // #quiz/all/zqJ2qURY8o/2
                'quiz/selected/:dictionaryId/(:category)'   : 'quizSelected',                  // #quiz/selected/zqJ2qURY8o/verbos regulares
                '*default'                                  : 'defaultRoute'
            },

            home: function() {
                // var loginView = new LoginView();
                fb.once("authenticated", function() {
                    var dictionaries = new DictionariesView();
                }, this);
                fb.auth();
            },
            logOut: function() {
                fb.logout();
                window.location.href = '#';
            },
            dictionariesList: function() {
                fb.once("authenticated", function() {
                    var dictionariesView = new DictionariesView();
                }, this);
                fb.auth();
            },
            /* request to shared dictionary, save and redirect */
            dictionaryShare: function(dictionaryId) {
                fb.once("authenticated", function() {
                    dictionaries.find(dictionaryId).then(function (dictionary) {
                        var share = new Share();
                        share.set({
                            user: fb.currentUser(),
                            dictionary: dictionary
                        });
                        Share.prototype.saveUnique(share);   // will cause redirect after save
                    });
                }, this);
                fb.auth();
            },
            dictionarySettings: function(dictionaryId) {
                fb.once("authenticated", function() {
                    dictionaries.find(dictionaryId).then(function (dictionary) {
                        var settingsView = new DictionarySettingsView(dictionary);
                    });
                }, this);
                fb.auth();
            },
            categories: function(dictionaryId) {
                fb.once("authenticated", function() {
                    dictionaries.find(dictionaryId).then(function (dictionary) {
                        app.setDictionary(dictionary);
                        var categoriesView = new CategoriesView();
                    });
                }, this);
                fb.auth();
            },

            quizDefault: function(dictionaryId) {
                fb.once("authenticated", function() {
                    dictionaries.find(dictionaryId).then(function (dictionary) {
                        app.setDictionary(dictionary);
                        /* temporary: start in "all" mode, do not keep category in storage */
                        quiz.set({
                            selectionMode: "all",
                            numWeeksBefore: 50
                        });
                        // quiz.restoreState();
                        var quizView = new QuizView();
                    });
                }, this);
                fb.auth();
            },
            quizAll: function(dictionaryId, numWeeksBefore) {
                fb.once("authenticated", function() {
                    dictionaries.find(dictionaryId).then(function (dictionary) {
                        app.setDictionary(dictionary);
                        quiz.set({
                            selectionMode: "all",
                            numWeeksBefore: numWeeksBefore
                        });
                        var quizView = new QuizView();
                    });
                }, this);
                fb.auth();
            },

            quizSelected: function(dictionaryId, category) {
                fb.once("authenticated", function() {
                    dictionaries.find(dictionaryId).then(function (dictionary) {
                        app.setDictionary(dictionary);
                        quiz.set({
                            selectionMode: "selected",
                            selectedCategory: category || ''
                        });
                        var quizView = new QuizView();
                    });
                }, this);
                fb.auth();
            },

            defaultRoute : function(params) {
                console.log("we are here");
            }

        });

        //define our new instance of router
        var appRouter = new AppRouter();

        // without History API
        Backbone.history.start({pushState: false});

    });


