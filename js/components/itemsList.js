/**
 * Created by Owner on 5/9/15.
 */

define([],
    function () {
        var ItemsList = React.createClass({
            render: function() {
                var langLeft = "spanish";
                var langRight = "russian";
                var list = this.props.items.map(function (item) {
                    return (
                        <ReactBootstrap.ListGroupItem bsStyle='info' key={item.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid'>

                                    <ReactBootstrap.Col xs={6} md={6}>
                                        <h4>{item.get(langLeft)}</h4>
                                    </ReactBootstrap.Col>

                                    <ReactBootstrap.Col xs={6} md={6}>
                                        <h4>{item.get(langRight)}</h4>
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

        return ItemsList;
    });
