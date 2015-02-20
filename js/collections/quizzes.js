/**
 * Created by Owner on 2/17/15.
 */
define(['models/app','models/quiz'],
    function (app, Quiz) {
        var self;

        var Quizzes = Parse.Collection.extend({
            model: Quiz,
            query: new Parse.Query(Quiz)
                .include("Translation")
                .include("Term"),

            initialize: function() {
                // this.query.equalTo("category", category);
                this.fetch({reset: true})
                    .then(function(quizzez) {
                        var r = quizzez;
                    });
            }

        });

        return Quizzes;
    });

/*
 var query = new Parse.Query(Quiz)
 .include("Translation")
 .include("Term");

 query.find().then(function(quiz_array) {
 var r = quiz_array;
 quiz_array.forEach( function(quiz) {
 var term = quiz.get("Term");
 var termName = term.get("Name");

 var translation = quiz.get("Translation");
 var translationName = translation.get("Name");

 // alert (termName + " - " + translationName);
 });
 });
 */