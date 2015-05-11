/**
 * Created by Owner on 5/8/15.
 */

define(['components/itemsFilterPopup'],
    function (ItemsFilterPopup) {
        var MyList = React.createClass({
            render: function () {
                var ListGroup = ReactBootstrap.ListGroup;
                var ListGroupItem = ReactBootstrap.ListGroupItem;
                var list = this.props.data.map(function (item) {
                    return (
                        <ListGroupItem bsStyle='success' key={item.get('category')}>
                            {item.get('category')}
                            <ReactBootstrap.Badge>{item.get('count')}</ReactBootstrap.Badge>
                        </ListGroupItem>
                    )
                });
                const listgroupInstance = (
                    <ListGroup>{list}</ListGroup>
                );
                return listgroupInstance;
            }
        });

        var MySelect = React.createClass({
            categoryChanged: function(event) {
                console.log(event.target.value)
            },
            render: function () {
                var Input = ReactBootstrap.Input;
                var ListGroupItem = ReactBootstrap.ListGroupItem;
                var options = this.props.data.map(function (item) {
                    return (
                        <option bsStyle='success' value={item.get('category')} key={item.get('category')}>
                            {item.get('category') + " (" + item.get('count') + ')'}
                        </option>
                    )
                });
                const selectInstance = (
                    <form>
                        <ReactBootstrap.Input type='select' placeholder='select' onChange={this.props.onCategorySelected}>
                            {options}
                        </ReactBootstrap.Input>
                    </form>
                );
                return selectInstance;
            }
        });

        var Toolbar = React.createClass({
            categoryChanged: function(event) {
                console.log(event.target.value)
            },
            getInitialState: function () {
                return {
                    data: []
                }
            },
            render: function () {
                var ButtonToolbar = ReactBootstrap.ButtonToolbar;
                var Button = ReactBootstrap.Button;

                const myselectInstance = (
                    <MySelect data={this.props.categories} ref="categories"
                        onCategorySelected = {this.props.onCategorySelected}
                    />
                );
                var catButton = "";
                if (this.props.selectedCategory.get) {
                    var catButton = this.props.selectedCategory.get("category") +
                        ' (' + this.props.selectedCategory.get("count") + ')';
                }

                var glyphSound = (this.props.sound == "on" ? "volume-up" : "volume-off");
                /*
                <ReactBootstrap.ButtonGroup>
                    <Button bsStyle='default' bsSize='medium'>
                                    {catButton}
                    </Button>
                </ReactBootstrap.ButtonGroup>
                */
                const toolbarInstance = (
                    <div>
                        <ReactBootstrap.ButtonGroup justified>

                            <ReactBootstrap.ButtonGroup>
                                <ReactBootstrap.ModalTrigger modal={<ItemsFilterPopup />}>
                                    <Button bsStyle='primary' bsSize='medium' onClick={this.props.onClickFilterButton}>
                                        <ReactBootstrap.Glyphicon glyph='filter' />
                                    </Button>
                                </ReactBootstrap.ModalTrigger>
                            </ReactBootstrap.ButtonGroup>
                            <ReactBootstrap.ButtonGroup>
                                <Button bsStyle='primary' bsSize='medium' onClick={this.props.onClickSoundButton}>
                                    <ReactBootstrap.Glyphicon glyph={glyphSound} />
                                </Button>
                            </ReactBootstrap.ButtonGroup>
                            <ReactBootstrap.ButtonGroup>
                                <Button bsStyle='primary' bsSize='medium' onClick={this.sort}>
                                    <ReactBootstrap.Glyphicon glyph='refresh' />
                                </Button>
                            </ReactBootstrap.ButtonGroup>
                            <ReactBootstrap.ButtonGroup>
                                <Button bsStyle='primary' bsSize='medium' onClick={this.sort}>
                                    <ReactBootstrap.Glyphicon glyph='info-sign' />
                                </Button>
                            </ReactBootstrap.ButtonGroup>

                        </ReactBootstrap.ButtonGroup>
                        {myselectInstance}
                    </div>
                );
                return toolbarInstance;
            }
        });

        return Toolbar;
    });
