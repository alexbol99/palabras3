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

                    var bsStyleLeft = item.left.id == this.props.selectedLeftItemId ? 'success' : 'info';
                    var bsStyleRight = item.right.id == this.props.selectedRightItemId ? 'success' : 'info';

                    var itemLeftInstance = (
                        <ReactBootstrap.Col xs={6} md={6} id={item.left.id} onClick={this.props.onLeftItemClick}>
                            <ReactBootstrap.Button bsStyle={bsStyleLeft}>
                                <h4>{item.left.get(langLeft)}</h4>
                            </ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    );

                    var itemRightInstance = (
                        <ReactBootstrap.Col xs={6} md={6} id={item.right.id} onClick={this.props.onRightItemClick}>
                            <ReactBootstrap.Button bsStyle={bsStyleRight}>
                                <h4>{item.right.get(langRight)}</h4>
                            </ReactBootstrap.Button>
                        </ReactBootstrap.Col>
                    );

                    var gridColumns = React.addons.createFragment({
                            itemLeftInstance: itemLeftInstance,
                            itemRightInstance: itemRightInstance
                        });

                    var bsStyle = item.id == this.props.selectedItemId ? 'success' : 'info';

                    return (
                        <ReactBootstrap.ListGroupItem key={item.left.cid + '_' + item.right.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid'>
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