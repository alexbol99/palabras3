/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/app','models/quiz',
        'jsx!views/categoriesView', 'jsx!views/quizView', 'jsx!views/dictionariesView',
        'models/quizItem', 'models/category', 'models/dictionary',
        'collections/categories','collections/quizItems', 'collections/catlist', 'collections/dictionaries',
        'jsx!components/confirmPopup',
        'jsx!components/quizToolbar', 'jsx!components/itemsListEdit', 'jsx!components/itemsListPlay',
        'jsx!components/itemsFilterPopup', 'jsx!components/infoPopup',
        'jsx!components/mainPanel', 'jsx!components/menu'],
    function (app, quiz, CategoriesView, QuizView, DictionariesView) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // Configure React's event system to handle touch events on mobile devices.
        React.initializeTouchEvents(true);

        // app.set("currentDictionary", "Class_Alberto_Ru");
        app.start();         // set dictionary

        var AppRouter = Backbone.Router.extend({

            routes: {
                "": 'home',
                'dictionary' : 'dictionary',          // #dictionary  TODO: no sense, change later
                'categories' : 'categories',                     // #categories
                'categories/all/(:numWeeksBefore)' : 'quizAll',  // #categories/all/2
                'categories/selected/(:category)':   'quizSelected',  // #categories/selected/verbos regulares
                '*default': 'default'
            },

            home: function() {
                var dictionaries = new DictionariesView();
            },

            dictionary: function() {
                 quiz.set({
                     currentDictionary: "Class_Alberto_Ru"
                 });
                 quiz.restoreState();
                 var quizView = new QuizView();
            },

            categories: function() {
                var categoriesView = new CategoriesView();
            },

            quizAll: function(numWeeksBefore) {
                quiz.set({
                    currentDictionary: "Class_Alberto_Ru",
                    selectionMode: "all",
                    numWeeksBefore: numWeeksBefore
                });
                var quizView = new QuizView();
            },

            quizSelected: function(category) {
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


