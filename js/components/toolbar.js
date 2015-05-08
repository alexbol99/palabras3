/**
 * Created by Owner on 5/8/15.
 */

define([],
    function () {
        var MyList = React.createClass({
            render: function () {
                var ListGroup = ReactBootstrap.ListGroup;
                var ListGroupItem = ReactBootstrap.ListGroupItem;
                var list = this.props.data.map(function (item) {
                    return (
                        <ListGroupItem bsStyle='success'>
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
                        <option bsStyle='success' value={item.get('category')}>
                            {item.get('category') + " (" + item.get('count') + ')'}
                        </option>
                    )
                });
                const selectInstance = (
                    <form>
                        <ReactBootstrap.Input type='select' placeholder='select' onChange={this.categoryChanged}>
                            {options}
                        </ReactBootstrap.Input>
                    </form>
                );
                return selectInstance;
            }
        });

        var ABCD = React.createClass({
            getInitialState: function () {
                return {
                    data: []
                }
            },
            sort: function (event) {
                console.log(event.target);
                var newData = this.state.data.sort();
                this.setState({data: newData});
            },
            reorder: function (event) {
                console.log(event.target);
                var newData = this.shuffle(this.state.data);
                this.setState({data: newData});
            },
            render: function () {
                var ButtonToolbar = ReactBootstrap.ButtonToolbar;
                var Button = ReactBootstrap.Button;
                const myselectInstance = (
                    <MySelect data={this.props.categories} ref="categories" />
                );
                var catButton = myselectInstance.props.data[0].get("category");
                console.log(myselectInstance);
                const abcdInstance = (
                    <div>
                        <ReactBootstrap.ButtonToolbar justified>
                            <ReactBootstrap.Button bsStyle='default' bsSize='small'>
                                {catButton}
                            </ReactBootstrap.Button>
                            <Button bsStyle='primary' bsSize='small' onClick={this.sort}>
                                A<ReactBootstrap.Glyphicon glyph='sort-by-alphabet' />
                            </Button>
                            <Button bsStyle='primary' bsSize='small' onClick={this.reorder}>
                                B<ReactBootstrap.Glyphicon glyph='random' />
                            </Button>
                        </ReactBootstrap.ButtonToolbar>
                    </div>
                );
                return abcdInstance;
            },
            // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
            shuffle: function (array) {
                var counter = array.length, temp, index;

                // While there are elements in the array
                while (counter > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * counter);

                    // Decrease counter by 1
                    counter--;

                    // And swap the last element with it
                    temp = array[counter];
                    array[counter] = array[index];
                    array[index] = temp;
                }

                return array;
            }
        });

        return ABCD;
    });