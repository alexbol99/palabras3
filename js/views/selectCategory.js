/**
 * Created by Owner on 1/15/15.
 */
define(['models/quiz'],
    function (quiz) {
        var self;
        var SelectCategoryView = Backbone.View.extend({

            el: "select#selectCategory",

            template: _.template('<option value="<%= category %>" ><%= text %></option>'),

            events: {
                "change": "categoryChanged"
            },

            initialize: function () {
                self = this;
                // this.categories.on("ready", this.render, this);
                // this.categories.on("change:count", this.increaseCounter, this);
            },

            render: function () {
                this.categories = quiz.get("categories");
                this.categories.each( function(category) {
                    $(self.el).append(self.template( {category: category.get("category"),
                        text: category.get("category") + ' (' + category.get("count") + ')'} ));
                });
                $(this.el).selectmenu('refresh');
                // this.categoryChanged();
            },

            categoryChanged: function() {
                quiz.set("selectedCategory", $(this.el).val());
            },

            increaseCounter: function(model) {
                var category = model.get("category");
                var count = model.get("count");
                $('select#selectCategory option[value="' + category + '"]').html(category + ' (' + count + ')');
                $(this.el).selectmenu('refresh');
            }

        });

        return SelectCategoryView;
    });
