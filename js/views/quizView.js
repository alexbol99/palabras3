/**
 * Created by alexbol on 1/8/2015.
 */

define(['models/quiz', 'views/textbox', 'views/addItemForm',
        'components/toolbar', '../components/itemsList', '../components/mainPanel',
        'components/menu'],
    function (quiz, Textbox, addItemForm, Toolbar, ItemsList, MainPanel, Menu) {
        var self;

        var QuizComponent = React.createClass({
            getInitialState: function () {
                return {
                    categories: [],
                    sound: "on",
                    selectedCategory: "",
                    quizItems: [],
                    numWeeksBefore: 2,
                    mode: "Learn",
                    action: ""
                }
            },
            componentDidMount: function() {
                var selectedCategoryName = quiz.get("selectedCategory");
                this.setState({
                    categories: quiz.get("categories").models,
                    selectedCategory: quiz.get("categories").findWhere({"category": selectedCategoryName}),
                    numWeeksBefore: quiz.get("numWeeksBefore"),
                    quizItems: quiz.get("quizItems"),
                    sound: quiz.get("sound")
                });
                quiz.off("ready");
                quiz.on("ready", function() {
                    console.log("ready to play");
                    this.setState({
                        quizItems: quiz.get("quizItems")
                    });
                }, this);
            },
            componentDidUpdate: function() {
                quiz.saveState();    // when DOM updated save current state in localStorage
            },
            render: function () {
                var toolbarInstance = (
                    <Toolbar categories={this.state.categories}
                        selectedCategory={this.state.selectedCategory}
                        mode={this.state.mode}
                        sound={this.state.sound}
                        numWeeksBefore={this.state.numWeeksBefore}
                        onCategorySelected = {this.setSelectedCategory}
                        onNumWeeksBeforeChanged = {this.setNumWeeksBefore}
                        onClickSoundButton = {this.toggleSound}
                        onClickAddButton = {this.setActionAdd}
                    />
                );
                var itemsListInstance = (
                    <ItemsList
                        mode = {this.state.mode}
                        action = {this.state.action}
                        sound = {this.state.sound}
                        categories={this.state.categories}
                        items = {this.state.quizItems}
                        onItemChanged = {this.itemChanged}
                        onCategorySelected = {this.itemChanged}
                        onClickSayItButton = {this.sayIt}
                        onClickGlobeButton = {this.redirectToSpanishdict}
                    />
                );

                var mainPanelInstance = (
                    <MainPanel
                        mode={this.state.mode}
                        selectedCategory={this.state.selectedCategory}
                        numWeeksBefore={this.state.numWeeksBefore}>

                        <div style={{height:'72vh', overflowY:'auto', overflowX:'hidden'}}>
                                {itemsListInstance}
                        </div>

                    </MainPanel>
                );

                var menuInstance = (
                    <Menu onMenuButtonClicked={this.setQuizMode}
                    />
                );

                return (
                    <div>
                        {toolbarInstance}
                        {mainPanelInstance}
                        {menuInstance}
                    </div>
                );
            },
            setQuizMode: function(event) {
                this.setState({mode: event.target.innerHTML});
            },
            toggleSound: function(event) {
                quiz.set("sound", this.state.sound == "on" ? "off" : "on");
                this.setState({ "sound": (this.state.sound == "on" ? "off" : "on") });
            },
            setSelectedCategory: function(event) {
                var selectedCategoryName = event.target.value;
                quiz.set("selectedCategory", selectedCategoryName);
                this.setState({
                    selectedCategory: quiz.get("categories").findWhere({"category": selectedCategoryName})
                });
            },
            setNumWeeksBefore: function(event) {
                var numWeeksBefore = event.target.value;
                quiz.set("numWeeksBefore", numWeeksBefore);
                this.setState({
                    numWeeksBefore: numWeeksBefore
                })
            },
            setActionAdd: function(event) {
                this.setState({
                    action: "add"
                })
            },
            itemChanged: function(event) {
                var id = event.target.id;
                var item = _.findWhere(quiz.get("quizItems").models, {"id":id});
                item.set(event.target.name, event.target.value);
                item.updateParse();
            },
            sayIt: function(event) {
                if (this.state.sound == "on") {
                    var id = event.currentTarget.id;
                    var item = _.findWhere(quiz.get("quizItems").models, {"id": id});
                    item.sayIt();
                }
            },
            redirectToSpanishdict: function(event) {
                var id = event.currentTarget.id;
                var item = _.findWhere(quiz.get("quizItems").models, {"id": id});
                var link = "http://www.spanishdict.com/translate/" + item.get("spanish");
                // similar behavior as an HTTP redirect
                // window.location.replace(link);
                // similar behavior as clicking on a link
                window.location.href = link;
            }
        });

        var Quiz = Backbone.View.extend({

            el: "div#div-main",

            templateHeader: _.template(
                '<a href="#" data-position-to="window" class="ui-btn ui-btn-inline ui-shadow ui-icon-audio ui-btn-icon-notext" id="toggle-sound-button"></a>' +
                '<a href="#" data-position-to="window" class="ui-btn ui-btn-inline ui-shadow ui-icon-refresh ui-btn-icon-notext" id="refresh-button"></a>' +
                '<a href="#addItemFormPopup" data-position-to="window" data-rel="popup" class="ui-btn ui-btn-inline ui-shadow ui-icon-plus ui-btn-icon-notext" id="add-button">Add</a>'
            ),

            initialize: function () {
                self = this;
                this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                quiz.on("match", this.match, this);
                quiz.on("ready", this.render, this);

                //this.selectCategoryView = new SelectCategoryView();
            },

            events: {
                "click #toggle-sound-button" : "toggleSound",
                "click #refresh-button" : "refresh_cb",
                "click #play-button" : "setAppMode",
                "click #edit-button" : "setAppMode"
            },

            render: function() {
                var guizComponentInstance = (
                    <QuizComponent />
                )
                React.render(guizComponentInstance, document.body);
            },
            // Render view and start the game
            jrender: function() {
                if (!quiz.get("started")) {
                    $(this.el).find("header").append(this.templateHeader());

                    this.selectCategoryView.render();

                    $("#add-button").on("click", addItemForm.openForm);

                    quiz.set("started", true);
                }

                if (quiz.get("forceRefresh")) {
                    this.selectCategoryView.render();
                    this.set("forceRefresh", false);
                }

                this.clearAll();

                $("#play-button").show();
                if (quiz.get("mode") == "Play") {
                    $("#refresh-button").show();
                    $("#add-button").hide();
                }
                else {
                    $("#add-button").show();
                    $("#refresh-button").hide();
                }

                this.quizItems = quiz.get("quizItems");
                this.refresh();

            },

            setAppMode: function(event) {
                quiz.set("mode", $(event.currentTarget).text());
                self.render();
            },

            refresh_cb: function() {
                self.refresh();
            },

            match: function() {
                this.curNum--;
                if (this.curNum == 0) {
                    this.refresh();
                }
            },

            refresh: function () {
                this.clearAll();

                if (quiz.get("mode") == "Play") {
                    this.palabras = this.quizItems.getRandom(this.maxNum);
                }
                else {
                    this.palabras = this.quizItems;
                }

                this.curNum = this.palabras.length;

                var y_position = 0;

                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var spanish = new Textbox({
                            model: {
                                palabra: palabra,
                                leftside: true,
                                text: palabra.get("spanish"),
                                y: y_position
                            }
                        });

                        y_position += 50;
                    }
                }, this);

                if (quiz.get("mode") == "Play") {
                    this.quizItems.shuffle(this.palabras);
                }

                var otherLanguage = "russian";  // $("#language").val();
                var hebrew = otherLanguage == "hebrew" ? true : false

                var y_position = 0;
                this.palabras.forEach(function(palabra) {
                    if (palabra) {
                        var other = new Textbox({
                            model: {
                                palabra: palabra,
                                leftside: false,
                                text: palabra.get(otherLanguage),
                                y: y_position,
                                hebrew: hebrew
                            }
                        });

                        y_position += 50;
                    }
                });
            },

            clearAll: function() {
                $("#palabras-container").empty();
            },

            toggleSound: function(event) {
                var button = event.currentTarget;
                console.log(button);
                if (quiz.get("sound")) {
                    $(button).removeClass('ui-icon-audio');
                }
                else {
                    $(button).addClass('ui-icon-audio');
                }
                quiz.set("sound", !quiz.get("sound"));
            }

        });

        return new Quiz();
    });

