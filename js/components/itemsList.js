/**
 * Created by Owner on 5/9/15.
 */

define([],
    function () {
        var ItemsList = React.createClass({
            render: function() {
                var langLeft = "spanish";
                var langRight = "russian";
                var mode = this.props.mode;
                var list = this.props.items.map(function (item) {
                    var chekboxInstance = mode == "Edit" ? (
                        <ReactBootstrap.Col xs={1} md={1}>
                            <ReactBootstrap.Input type='checkbox' />
                        </ReactBootstrap.Col>
                    ) : null;

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle='info' key={item.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid'>
                                    {chekboxInstance}

                                    <ReactBootstrap.Col xs={5} md={5}>
                                        <h4>{item.get(langLeft)}</h4>
                                    </ReactBootstrap.Col>

                                    <ReactBootstrap.Col xs={5} md={5}>
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

/*<ReactBootstrap.Glyphicon glyph='remove' />*/