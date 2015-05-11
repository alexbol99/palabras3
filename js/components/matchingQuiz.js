/**
 * Created by Owner on 5/9/15.
 */

define([],
    function () {
        var ListItems = React.createClass({
            render: function() {
                var langLeft = "spanish";
                var langRight = "russian";
                var list = this.props.items.map(function (item) {
                    return (
                        <ReactBootstrap.ListGroupItem bsStyle='info' key={item.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid'>

                                    <ReactBootstrap.Col xs={6} md={6}>
                                        <h2>{item.get(langLeft)}</h2>
                                    </ReactBootstrap.Col>

                                    <ReactBootstrap.Col xs={6} md={6}>
                                        <h2>{item.get(langRight)}</h2>
                                    </ReactBootstrap.Col>

                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>

                        </ReactBootstrap.ListGroupItem>
                    )
                });
                return (
                    <ReactBootstrap.ListGroup>
                        {list}
                    </ReactBootstrap.ListGroup>
                );
            }
        });

        var MatchingQuiz = React.createClass({
            render: function () {
                var ListGroup = ReactBootstrap.ListGroup;
                var ListGroupItem = ReactBootstrap.ListGroupItem;
                const listgroupInstance = (
                    <ListItems items = {this.props.items} />
                );
                return listgroupInstance;
            }
        });

        return MatchingQuiz;
    });
