/**
 * Created by Owner on 5/9/15.
 */

define([],
    function () {
        var ItemsListPlay = React.createClass({
            render: function() {
                var langLeft = "spanish";
                var langRight = "russian";

                var items = [];

                this.props.itemsLeft.forEach( function(item, i) {
                    items.push({
                        left: item,
                        right: this.props.itemsRight.at(i)
                    });

                }, this);

                var list = items.map(function (item) {

                    var itemLeftInstance = (
                        <ReactBootstrap.Col xs={5} md={5}>
                            <h4>{item.left.get(langLeft)}</h4>
                        </ReactBootstrap.Col>
                    );

                    var itemRightInstance = (
                        <ReactBootstrap.Col xs={5} md={5}>
                            <h4>{item.right.get(langRight)}</h4>
                        </ReactBootstrap.Col>
                    );

                    var gridColumns = React.addons.createFragment({
                            itemLeftInstance: itemLeftInstance,
                            itemRightInstance: itemRightInstance
                        });

                    var bsStyle = item.id == this.props.selectedItemId ? 'success' : 'info';

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle={bsStyle} key={item.left.cid + '_' + item.right.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid' id={item.id} onClick={this.props.onItemClick}>
                                    {gridColumns}
                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>

                        </ReactBootstrap.ListGroupItem>
                    )
                }, this);
                return (
                    <ReactBootstrap.ListGroup>
                        {list}
                    </ReactBootstrap.ListGroup>
                );
            }
        });

        return ItemsListPlay;
    });

/*<ReactBootstrap.Glyphicon glyph='remove' />*/
/*,
 buttonSayItInstance: buttonSayItInstance,
 buttonGlobeInstance: buttonGlobeInstance*/