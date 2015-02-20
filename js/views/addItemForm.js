/**
 * Created by Owner on 1/20/15.
 */
define(['collections/categories','models/palabra'],
    function (categories, PalabraParseObject) {
        var self;
        var AddFormView = Backbone.View.extend({

            el: "form#addItemForm",

            optionTemplate: _.template('<option value="<%= category %>" ><%= text %></option>'),

            events: {
                "submit": "formSubmitted"
            },

            initialize: function () {
                self = this;
                this.category = "";
                $("#add-item-button").on("click", this.openForm);
            },

            openForm: function() {
                // Fill-in select options
                $("form#addItemForm select").empty();
                categories.each( function(category) {
                    $("form#addItemForm select").append(self.optionTemplate( {category: category.get("category"),
                        text: category.get("category")} ));
                });
                $("form#addItemForm select").selectmenu('refresh');
                this.category = $("#select-category-add-input-field").val();
                // Form will be opened automatically by JQuery Mobile
            },

            resetForm: function() {
                $(self.el)[0].reset();
                $("#select-category-add-input-field").val(self.category);
                categories.changeCounter(self.category, 1);
            },


            formSubmitted: function() {
                this.category = $("#select-category-add-input-field").val();
                var spanish = $("#spanish-add-input-field").val();
                var russian = $("#russian-add-input-field").val();
                var hebrew = $("#hebrew-add-input-field").val();

                var palabra = new PalabraParseObject();
                palabra.set("category", this.category);
                palabra.set("spanish", spanish);
                palabra.set("russian", russian);
                palabra.set("hebrew", hebrew);

                palabra.on("added", this.resetForm);

                var queryExist = new Parse.Query(PalabraParseObject)
                    .equalTo("spanish", spanish);
                queryExist.find({
                    success: function(results) {
                        if (results.length == 0) {
                            palabra.addToParse();       // save to cloud and trigger event "added" on success
                        }
                        else {
                            // popup "already exist"
                            alert("word '" + palabra.get("spanish") + "' already exist");
                        }
                    },
                    error: function(error) {
                        // There was an error.
                    }
                });

                return false;
            }
        });

        return new AddFormView();
    });