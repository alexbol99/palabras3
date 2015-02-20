/**
 * Created by Owner on 2/17/15.
 */
define(['models/app', 'collections/quizzes'],
    function (app, Quizzes) {
        var self;

        var Dashboard = Backbone.View.extend({

            el: "#page-main",

            initialize: function () {
                self = this;
                this.quizzes = new Quizzes();
            },

            events: {
            }

        });

        return Dashboard;
    });

