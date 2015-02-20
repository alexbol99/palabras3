/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['views/loginView','models/quiz', 'views/dashBoardView',
        'models/app','models/palabra',
        'collections/quizzes',
        'collections/categories','collections/quizItems',
        'views/textbox','views/quizView','views/selectCategory',
        'views/addItemForm', 'views/editItemForm'],
    function (LoginView, Quiz, DashBoardView /*appStage, Palabra, categories, Textbox, Quiz*/) {
        // $( "#popupPalabras" ).popup( "open" );

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : '398066583702762',
                status     : true,  // check Facebook Login status
                cookie     : true,  // enable cookies to allow Parse to access the session
                xfbml      : true,  // initialize Facebook social plugins on the page
                version    : 'v2.2' // point to the latest Facebook Graph API version
            });

            // Run code after the Facebook SDK is loaded.
            // FacebookLogIn();
            var loginView = new LoginView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        var Router = Backbone.Router.extend({
            routes: {
                '': 'index',
                'quizzes' : 'goDashBoard',
                '*default': 'goDefault'
            },
            index: function() {
                var loginView = new LoginView();
            },

            goDashBoard: function() {
                var dashboardView = new DashBoardView();
            },

            //goPage: function(name, hashtag) {
            //    require( ['models/'+name], function(page) {
            //        var pageView = new DocPageView({model: page});
            //        if (hashtag != null) {
            //            pageView.scrollTo(hashtag);
            //        }
            //    });
            //},

            goDefault: function(param) {
                $(document.body).append("This route is not handled.. you tried to access: "+  param);
            }
        });

        var router = new Router();

        Backbone.history.start();

    });

