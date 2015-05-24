/**
 * Created by alexbol on 1/8/2015.
 */

define(['models/quiz',
        'components/toolbar', '../components/itemsList', '../components/mainPanel',
        'components/menu'],
    function (quiz, Toolbar, ItemsList, MainPanel, Menu) {
        var self;

        var QuizComponent = React.createClass({
            getInitialState: function () {
                return {
                    categories: [],
                    sound: "on",
                    selectedCategory: "",
                    quizItems: [],
                    numWeeksBefore: 2,
                    mode: "Learn"
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
                        onClickAddButton = {this.addEmptyItem}
                        onClickDeleteButton = {this.deleteCheckedItems}
                    />
                );
                var itemsListInstance = (
                    <ItemsList
                        mode = {this.state.mode}
                        sound = {this.state.sound}
                        categories={this.state.categories}
                        items = {this.state.quizItems}
                        onCheckboxChanged = {this.itemTriggerChecked}
                        onItemClick = {this.itemSetEditable}
                        onItemChanged = {this.itemChange}
                        onCategorySelected = {this.itemChange}
                        onClickSayItButton = {this.itemSayIt}
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
            addEmptyItem: function(event) {
                if (this.state.mode == "Edit") {
                    quiz.addEmptyItem();
                }
            },
            deleteCheckedItems: function(event) {
                if (this.state.mode == "Edit") {
                    quiz.deleteCheckedItems();
                }
            },
            // Open item for editing, substitute clicked Grid element by Input elements
            itemSetEditable: function(event) {
                if (this.state.mode == "Edit") {
                    var id = event.currentTarget.id;
                    var item = _.findWhere(quiz.get("quizItems").models, {"id":id});
                    quiz.get("quizItems").setEditable(item);
                    // quizItems is Backbone's mutable object, when it changes state is not changed
                    // so call force update for DOM modification
                    // see http://stackoverflow.com/questions/21709905/can-i-avoid-forceupdate-when-using-react-with-backbone
                    this.forceUpdate();
                }
            },
            itemChange: function(event) {
                var id = event.target.id;
                var item = _.findWhere(quiz.get("quizItems").models, {"id":id});
                item.set(event.target.name, event.target.value);
                item.updateParse();
            },
            itemSayIt: function(event) {
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
            },
            itemTriggerChecked: function(event) {
                var id = event.currentTarget.id;
                var item = _.findWhere(quiz.get("quizItems").models, {"id": id});
                item.set("checked", event.target.checked);
            }
        });

        var Quiz = Backbone.View.extend({
            initialize: function () {
                self = this;
                // this.maxNum = (window.orientation == undefined || window.orientation == 0) ? 8 : 4;
                // quiz.on("match", this.match, this);
                quiz.on("ready", this.render, this);
            },

            render: function() {
                var items = quiz.get("quizItems");
                // Augment item with "editable" flag, setting to "false"
                items.dropEditable();

                var guizComponentInstance = (
                    <QuizComponent />
                );
                React.render(guizComponentInstance, document.body);
            }
        });

        return new Quiz();
    });

