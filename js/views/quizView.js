/**
 * Created by alexbol on 1/8/2015.
 */

define(['models/app',
        'models/quiz',
        '../components/quizToolbar',
        '../components/itemsListEdit', '../components/itemsListPlay',
        '../components/mainPanel',
        'components/menu'],
    function (app, quiz, Toolbar, ItemsListEdit, ItemsListPlay, MainPanel, Menu) {
        var recognition;
        var final_transcript = '';

        var QuizComponent = React.createClass({
            getInitialState: function () {
                return {
                    sound: "on",
                    categories: [],
                    selectionMode: 'all',
                    selectedCategoryName: "",
                    selectedCategoryCount: 0,
                    quizItems: [],
                    quizItemsLeft: [],
                    quizItemsRight: [],
                    languageOnLeft: null,
                    languageOnRight: null,
                    numWeeksBefore: 2,
                    mode: "Edit",
                    selectedItemId: undefined,
                    selectedLeftItemId: undefined,
                    selectedRightItemId: undefined,
                    editSelectedItem: false,
                    maxItemsToPlay: (window.orientation == undefined || window.orientation == 0) ? 8 : 4,
                    autoPlayStarted: false,
                    itemsSortedLeft: true,
                    itemsSortedRight: false
                }
            },
            componentDidMount: function() {
                var quizItems = quiz.get("quizItems");
                var quizItemsLeft = quiz.get("quizItems").getRandom(this.state.maxItemsToPlay);
                var quizItemsRight = quizItemsLeft.shuffle();
                this.setState({
                    categories: quiz.get("categories").models,
                    selectionMode: quiz.get("selectionMode"),
                    selectedCategoryName: quiz.get("selectedCategory"),
                    selectedCategoryCount: quiz.get("quizItems").length,
                    numWeeksBefore: quiz.get("numWeeksBefore"),
                    quizItems: quizItems,
                    quizItemsLeft: quizItemsLeft,
                    quizItemsRight: quizItemsRight,
                    languageOnLeft: this.props.dictionary.get('language1'),
                    languageOnRight: this.props.dictionary.get('language2'),
                    selectedLeftItemId: undefined,
                    selectedRightItemId: undefined,
                    sound: quiz.get("sound"),
                    mode: quiz.get("mode"),
                    itemsSortedLeft: true,
                    itemsSortedRight: false
                });

                // Observe future changes of the quiz model
                // ---------------------------------
                quiz.off("ready");
                quiz.on("ready", function() {
                    // console.log("ready to play");
                    var quizItems = quiz.get("quizItems");
                    var quizItemsLeft = quiz.get("quizItems").getRandom(this.state.maxItemsToPlay);
                    var quizItemsRight = quizItemsLeft.shuffle();
                    this.setState({
                        quizItems: quizItems,
                        selectionMode: quiz.get("selectionMode"),
                        selectedCategoryName: quiz.get("selectedCategory"),
                        selectedCategoryCount: quizItems.length,
                        quizItemsLeft: quizItemsLeft,
                        quizItemsRight: quizItemsRight,
                        selectedLeftItemId: undefined,
                        selectedRightItemId: undefined,
                        itemsSortedLeft: true,
                        itemsSortedRight: false
                    });
                }, this);
            },
            componentDidUpdate: function() {
                quiz.saveState();    // when DOM updated save current state in localStorage
            },
            render: function () {

                var toolbarInstance = (
                    <Toolbar categories={this.state.categories}
                        selectionMode={this.state.selectionMode}
                        selectedCategoryName={this.state.selectedCategoryName}
                        selectedCategoryCount={this.state.selectedCategoryCount}
                        mode={this.state.mode}
                        sound={this.state.sound}
                        numWeeksBefore={this.state.numWeeksBefore}
                        selectedItemId = {this.state.selectedItemId}
                        autoPlayStarted = {this.state.autoPlayStarted}
                        onSelectionModeChanged = {this.toggleSelectionMode}
                        onCategorySelected = {this.setSelectedCategory}
                        onNumWeeksBeforeChanged = {this.setNumWeeksBefore}
                        onClickSoundButton = {this.toggleSound}
                        onClickAddButton = {this.addEmptyItem}
                        onClickEditButton = {this.toggleEditItem}
                        onClickShuffleButton = {this.shuffleItems}
                        onClickAutoPlayButton = {this.togglePlayOrPause}
                    />
                );

                var itemsListEditInstance = (
                    <ItemsListEdit
                        dictionary={this.props.dictionary}
                        categories={this.state.categories}
                        items = {this.state.quizItems}
                        selectedItemId = {this.state.selectedItemId}
                        editSelectedItem = {this.state.editSelectedItem}
                        onItemClick = {this.toggleSelectedItemId}
                        onItemChanged = {this.itemChange}
                        onCategoryChanged = {this.itemChangeCategory}
                        onClickSayItButton = {this.itemSayIt}
                        onClickGlobeButton = {this.redirectToSpanishdict}
                        onConfirmDeleteItem = {this.itemDelete}
                    />
                );

                var itemsListPlayInstance = (
                    <ItemsListPlay
                        dictionary={this.props.dictionary}
                        itemsLeft = {this.state.quizItemsLeft}
                        itemsRight = {this.state.quizItemsRight}
                        selectedLeftItemId = {this.state.selectedLeftItemId}
                        selectedRightItemId = {this.state.selectedRightItemId}
                        onLeftItemClick = {this.toggleLeftSelectedItemId}
                        onRightItemClick = {this.toggleRightSelectedItemId}
                    />
                );

                var itemsListInstance = (this.state.mode == "Edit" ? itemsListEditInstance : itemsListPlayInstance);

                var mainPanelInstance = (
                    <MainPanel
                        dictionary={this.props.dictionary}
                        mode={this.state.mode}
                        selectionMode={this.state.selectionMode}
                        selectedCategoryName={this.state.selectedCategoryName}
                        selectedCategoryCount={this.state.selectedCategoryCount}
                        numWeeksBefore={this.state.numWeeksBefore}
                        itemsSortedLeft={this.state.itemsSortedLeft}
                        itemsSortedRight={this.state.itemsSortedRight}
                        onSortItemsLeftButtonClicked={this.sortItemsLeft}
                        onSortItemsRightButtonClicked={this.sortItemsRight}
                    >

                        <div style={{height:'69vh', overflowY:'auto', overflowX:'hidden'}}>
                                {itemsListInstance}
                        </div>

                    </MainPanel>
                );

                var menuInstance = (
                    <Menu onButtonEditClicked={this.setEditMode} onButtonPlayClicked={this.setPlayMode}
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

            // Footer menu logic - switch between "Edit" and "Play" mode
            // -----------------------------------------------------------
            setEditMode: function(event) {
                // this.setState({mode: event.target.innerHTML});
                quiz.set("mode", 'Edit');
                this.setState({
                    mode: 'Edit',
                    quizItems: quiz.get("quizItems")
                });
            },
            setPlayMode: function(event) {
                quiz.set("mode", 'Play');

                if (this.state.selectedLeftItemId == undefined && this.state.selectedRightItemId == undefined) {
                    var quizItems = quiz.get("quizItems");
                    var quizItemsLeft = quiz.get("quizItems").getRandom(this.state.maxItemsToPlay);
                    var quizItemsRight = quizItemsLeft.shuffle();
                    this.setState({
                        mode: 'Play',
                        quizItems: quizItems,
                        quizItemsLeft: quizItemsLeft,
                        quizItemsRight: quizItemsRight
                    });
                }
                else {
                    this.setState({
                        mode: 'Play'
                    });
                }
            },

            // Header toolbar logic in mode "Edit"
            // -----------------------------------

            // Button "Sound" - both in "Edit" and "Play" modes
            toggleSound: function(event) {
                quiz.set("sound", this.state.sound == "on" ? "off" : "on");
                this.setState({ "sound": (this.state.sound == "on" ? "off" : "on") });
            },
            // Button "Add" - add new empty item
            addEmptyItem: function(event) {
                if (this.state.mode == "Edit") {
                    quiz.addEmptyItem();
                    this.setState({
                        editSelectedItem: true
                    });
                }
            },
            // Button "Edit" - toggle selected item to be edited or displayed
            toggleEditItem: function() {
                this.setState({
                    editSelectedItem: this.state.editSelectedItem ? false : true
                });
                // quiz.sortItems();
            },

            // 3 callbacks for the items filter, cause redirect to new page and fetching items from Parse
            // Both in "Edit" and "Play" modes
            // -------------------------------------------------------------------------------------------

            // Called when selection mode (radio group All/Selected) changed
            toggleSelectionMode: function(event) {
                this.setState({
                    selectionMode: event.currentTarget.value
                }, this.redirectToNewQuiz);
            },
            // Called when category changed
            setSelectedCategory: function(event) {
                this.setState({
                    selectedCategoryName: event.target.value
                }, this.redirectToNewQuiz);
            },
            // Called when number of weeks for new items changed
            setNumWeeksBefore: function(event) {
                this.setState({
                    numWeeksBefore:  event.target.value
                }, this.redirectToNewQuiz)
            },
            // REDIRECT TO NEW PAGE
            redirectToNewQuiz: function() {
                var link = '#quiz/';
                switch (this.state.selectionMode) {
                    case 'all':
                        link += 'all/' + app.get('currentDictionary').id + '/' + this.state.numWeeksBefore;
                        break;
                    case 'selected':
                        if (this.state.selectedCategoryName) {
                            link += 'selected/' + app.get('currentDictionary').id + '/' + this.state.selectedCategoryName;
                        }
                        else {
                            quiz.setSelectedCategory();
                            link += 'selected/' + app.get('currentDictionary').id + '/' + quiz.get('selectedCategory');
                        }
                        break;
                }
                // similar behavior as clicking on a link
                window.location.href = link;
            },

            // Items list logic in "Edit" mode
            // -------------------------------------

            // Header: sort items
            sortItemsLeft: function(event) {
                var language = event.currentTarget.id;
                quiz.sortItems(language);
                this.setState({
                    itemsSortedLeft: true,
                    itemsSortedRight: false
                })
            },
            sortItemsRight: function(event) {
                var language = event.currentTarget.id;
                quiz.sortItems(language);
                this.setState({
                    itemsSortedLeft: false,
                    itemsSortedRight: true
                })
            },

            // Toggle item selection. Selected item can be edited or deleted
            toggleSelectedItemId: function(event) {
                var id = event.currentTarget.id;
                this.setState({
                    selectedItemId:
                        (this.state.selectedItemId != undefined && this.state.selectedItemId == id && !this.state.editSelectedItem) ? undefined : id
                });
            },
            // Item was edited - update databased on Parse
            itemChange: function(event) {
                var id = event.target.id;
                var item = _.findWhere(quiz.get("quizItems").models, {"id":id});
                item.set(event.target.name, event.target.value);
                item.updateParse();
            },
            // Items category was changed. Update database, change items list and counters
            itemChangeCategory: function(event) {
                if (this.state.mode == "Edit") {
                    if (event.target.value == "add new category") {
                        /* Redirect to the categories editing page */
                        var link = '#categories/' + app.get('currentDictionary').id;
                        window.location.href = link;
                    }
                    else {
                        var id = event.target.id;
                        var item = _.findWhere(quiz.get("quizItems").models, {"id": id});
                        var oldCategory = item.get("category");
                        var newCategory = event.target.value;
                        quiz.itemUpdateCategory(item, oldCategory, newCategory);
                        this.setState({
                            selectedItemId: undefined
                        });
                    }
                }
            },
            // Open item for editing, substitute clicked Grid element by Input elements
            itemSayIt: function(event) {
                event.stopPropagation();
                if (this.state.sound == "on") {
                    var id = event.currentTarget.id;
                    var item = _.findWhere(quiz.get("quizItems").models, {"id": id});
                    // var language = this.state.languageOnLeft;
                    item.sayIt(this.state.languageOnLeft, this.state.languageOnRight);           // "spanish");
                }
            },
            // Redirect to external source
            redirectToSpanishdict: function(event) {
                event.stopPropagation();
                var id = event.currentTarget.id;
                var item = _.findWhere(quiz.get("quizItems").models, {"id": id});
                var url = this.state.languageOnLeft.get("learnMore");
                var languageName = this.state.languageOnLeft.get("name");
                if (url) {
                    var link = url + item.get(languageName);   // "spanish");
                    window.location.href = link;
                }
            },
            // Button "Delete" - delete selected item. TODO - confirmation popup
            itemDelete: function(event) {
                if (this.state.mode == "Edit" && this.state.selectedItemId) {
                    // var id = event.currentTarget.id;
                    var item = _.findWhere(quiz.get("quizItems").models, {"id": this.state.selectedItemId});
                    quiz.deleteItem(item);
                    this.setState({
                        selectedItemId: undefined
                    });

                }
            },


            // Items list logic in "Play" mode
            // ---------------------------------------------

            // Shuffle items and refresh component
            shuffleItems: function() {
                var quizItems = quiz.get("quizItems");
                var quizItemsLeft = quiz.get("quizItems").getRandom(this.state.maxItemsToPlay);
                var quizItemsRight = quizItemsLeft.shuffle();
                if (this.state.mode == "Play") {
                    this.setState({
                        quizItemsLeft: quizItemsLeft,
                        quizItemsRight: quizItemsRight,
                        selectedLeftItemId: undefined,
                        selectedRightItemId: undefined
                    })
                }
            },

            toggleLeftSelectedItemId: function(event) {
                var id = event.currentTarget.id;
                this.setState({
                    selectedLeftItemId:
                        (this.state.selectedLeftItemId != undefined && this.state.selectedLeftItemId == id) ? undefined : id
                }, this.checkMatch);
            },

            toggleRightSelectedItemId: function(event) {
                var id = event.currentTarget.id;
                this.setState({
                    selectedRightItemId:
                        (this.state.selectedRightItemId != undefined && this.state.selectedRightItemId == id) ? undefined : id
                }, this.checkMatch);
            },

            checkMatch: function() {
                if (this.state.selectedLeftItemId == undefined || this.state.selectedRightItemId == undefined)
                    return;
                if (this.state.selectedLeftItemId == this.state.selectedRightItemId) {
                    var itemLeft = _.findWhere(this.state.quizItemsLeft.models, {"id": this.state.selectedLeftItemId});
                    var itemRight = _.findWhere(this.state.quizItemsRight.models, {"id": this.state.selectedRightItemId});

                    if (this.state.sound == "on") {
                        var language = this.state.languageOnLeft;
                        itemLeft.sayIt(this.state.languageOnLeft, this.state.languageOnRight);           // "spanish");
                        // itemRight.sayIt("russian");
                    }

                    // recognition.stop();

                    var quizItemsLeftNew = this.state.quizItemsLeft.clone();
                    var quizItemsRightNew = this.state.quizItemsRight.clone();
                    quizItemsLeftNew.remove(itemLeft);
                    quizItemsRightNew.remove(itemRight);
                    this.setState({
                        quizItemsLeft: quizItemsLeftNew,
                        quizItemsRight: quizItemsRightNew,
                        selectedLeftItemId: undefined,
                        selectedRightItemId: undefined
                    }, this.stopRecognition);    // this.refresh)
                }
            },

            refresh: function() {
                if (this.state.quizItemsLeft.length == 0 && this.state.quizItemsRight.length == 0) {
                    this.setPlayMode();
                    //this.setState({
                    //    selectedLeftItemId: undefined,
                    //    selectedRightItemId: undefined
                    //}, this.setPlayMode);                  // repeat again
                }
                else {
                    this.autoPlay();
                }
            },

            togglePlayOrPause: function() {
                this.setState({
                    autoPlayStarted: this.state.autoPlayStarted ? false : true
                }, this.autoPlay);
            },

            autoPlay: function() {
                if (this.state.autoPlayStarted) {
                    var item = this.state.quizItemsRight.at(0);

                    // item.sayIt("spanish");

                    this.setState({
                        selectedRightItemId: item.id
                    }, this.startRecognition);
                }
                else {
                    this.setState({
                        selectedRightItemId: undefined
                    });
                }
            },

            startRecognition: function() {
                var itemRight = _.findWhere(this.state.quizItemsLeft.models, {"id": this.state.selectedRightItemId});
                var self = this;

                recognition.onresult = function (event) {
                    var interim_transcript = '';

                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        interim_transcript += event.results[i][0].transcript;
                        console.log(interim_transcript);
                    }
                    var languageName = self.state.languageOnLeft.get('name');
                    if (interim_transcript == itemRight.get(languageName)) {   // 'spanish')) {
                        self.setState({
                            selectedLeftItemId: itemRight.id
                        }, self.checkMatch);
                    }
                };

                recognition.onaudioend = function(event) {
                    self.setState({
                        selectedLeftItemId: itemRight.id
                    }, self.checkMatch);
                };

                //recognition.onsoundend = function(event) {
                //    self.setState({
                //        autoPlayStarted: false
                //    }, self.stopRecognition);
                //};
                //recognition.onspeechend = function(event) {
                //    self.setState({
                //        autoPlayStarted: false
                //    }, self.stopRecognition);
                //};
                //
                try {
                    recognition.start();
                }
                catch (e) {
                    console.log(e);
                }

            },

            stopRecognition: function() {
                var self = this;
                recognition.onend = function() {
                    self.refresh();
                };
                try {
                    recognition.onaudioend = null;
                    recognition.stop();
                }
                catch(e) {

                }
                this.refresh();
            }
        });

        var QuizView = Backbone.View.extend({
            initialize: function () {
                if ('webkitSpeechRecognition' in window) {
                    recognition = new webkitSpeechRecognition();
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    recognition.lang = app.get('currentDictionary').get('language1').get('lcid');  // 'es-ES';
                }

                quiz.on("ready", this.render, this);
                quiz.start();
            },

            render: function() {
                var guizComponentInstance = (
                    <QuizComponent
                        dictionary = {app.get('currentDictionary')}
                    />
                );
                React.render(guizComponentInstance, document.getElementById("page-main"));
            }
        });

        return QuizView;    // new QuizView();
    });

