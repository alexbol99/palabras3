/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/app','models/quiz','models/palabra',
        'collections/categories','collections/quizItems',
        'jsx!views/quizView',
        'jsx!components/toolbar', 'jsx!components/itemsListEdit', 'jsx!components/itemsListPlay',
        'jsx!components/itemsFilterPopup', 'jsx!components/infoPopup',
        'jsx!components/mainPanel', 'jsx!components/menu'],
    function (app, quiz) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // Configure React's event system to handle touch events on mobile devices.
        React.initializeTouchEvents(true);

        app.set("currentDictionary", "Class_Alberto_Ru");

        var AppRouter = Backbone.Router.extend({

            routes: {
                "": 'home',
                'categories' : 'categories',
                'categories/all/(:numWeeksBefore)' : 'quizAll',  // #categories/all/2
                'categories/selected/(:category)':   'quizSelected',  // #categories/selected/verbos regulares
                '*default': 'default'
            },

            home: function() {
                quiz.start();
            },

            categories: function() {
                console.log('categories')
            },

            quizAll: function(numWeeksBefore) {
                quiz.start("all", "", numWeeksBefore);
            },

            quizSelected: function(category) {
                quiz.start("selected", category);
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


