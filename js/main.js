/**
 * Created by alexbol on 1/8/2015.
 */
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});
require(['models/app','models/quiz','models/palabra',
        'collections/categories','collections/quizItems',
        'views/textbox','jsx!views/quizView',
        'views/addItemForm', 'views/editItemForm',
        'jsx!components/toolbar', 'jsx!components/itemsList',
        'jsx!components/itemsFilterPopup', 'jsx!components/infoPopup',
        'jsx!components/mainPanel', 'jsx!components/menu'],
    function (app) {

        Parse.initialize("nNSG5uA8wGI1tWe4kaPqX3pFFplhc0nV5UlyDj8H", "IDxfUbmW9AIn7iej2PAC7FtDAO1KvSdPuqP18iyu");

        // Configure React's event system to handle touch events on mobile devices.
        React.initializeTouchEvents(true);

        app.start();
    });


