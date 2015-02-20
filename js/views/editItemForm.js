/**
 * Created by Owner on 1/20/15.
 */
define(['collections/categories','models/palabra'],
    function (categories, PalabraParseObject) {
        var self;
        var EditFormView = Backbone.View.extend({

            el: "form#editItemForm",

            optionTemplate: _.template('<option value="<%= category %>" ><%= text %></option>'),

            anchorTemplate:_.template('<a href="#" class="ui-btn ui-shadow">Anchor</a>'),

            events: {
                "submit": "formSubmitted"
            },

            initialize: function () {
                self = this;
                this.palabra = null;
            },

            openForm: function(palabra) {
                // Fill-in select options
                $("form#editItemForm select").empty();
                categories.each( function(category) {
                    $("form#editItemForm select").append(self.optionTemplate( {category: category.get("category"),
                        text: category.get("category")} ));
                });
                // Set current option value and update Select widget
                $("#select-category-edit-input-field").val(palabra.get("category"));
                $("form#editItemForm select").selectmenu('refresh');

                // Fill in form with current values of Parse object
                $("#spanish-edit-input-field").val(palabra.get("spanish"));
                $("#russian-edit-input-field").val(palabra.get("russian"));
                $("#hebrew-edit-input-field").val(palabra.get("hebrew"));

                $("#learn-more-anchor").attr("href", "http://www.spanishdict.com/translate/" + palabra.get("spanish"));

                $("#editItemFormPopup").popup("open");

                this.palabra = palabra;                // keep Parse object to be updated
            },

            formSubmitted: function() {
                var category = $("#select-category-edit-input-field").val();
                var spanish = $("#spanish-edit-input-field").val();
                var russian = $("#russian-edit-input-field").val();
                var hebrew = $("#hebrew-edit-input-field").val();

                if (this.palabra.get("category") != category) {
                    categories.changeCounter(this.palabra.get("category"), -1);
                    categories.changeCounter(category, 1);
                }
                this.palabra.set("category", category);
                this.palabra.set("spanish", spanish);
                this.palabra.set("russian", russian);
                this.palabra.set("hebrew", hebrew);

                this.palabra.updateParse();

/*
                var queryExist = new Parse.Query(PalabraParseObject)
                    .equalTo("spanish", spanish);
                queryExist.find({
                    success: function(results) {
                        if (results.length == 0) {
                            self.palabra.updateParse();       // update in cloud and trigger event "??" on success
                        }
                        else {
                            // popup "already exist"
                            alert("word '" + self.palabra.get("spanish") + "' already exist");
                        }
                    },
                    error: function(error) {
                        // There was an error.
                    }
                });
*/
                return false;
            }
        });

        return new EditFormView();
    });