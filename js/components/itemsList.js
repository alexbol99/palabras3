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

                var options = this.props.categories.map(function (item) {
                    return (
                        <option bsStyle='success' value={item.get('category')} key={item.get('category')} >
                            {item.get('category') + " (" + item.get('count') + ')'}
                        </option>
                    )
                });

                var list = this.props.items.map(function (item) {

                    var chekboxInstance = mode == "Edit" ? (
                        <ReactBootstrap.Col xs={1} md={1}>
                            <ReactBootstrap.Input type='checkbox' />
                        </ReactBootstrap.Col>
                    ) : null;

                    var itemLeftInstance = mode == "Edit" ? (
                        <ReactBootstrap.Col xs={4} md={4}>
                            <ReactBootstrap.Input bsSize="small"  type="text" defaultValue={item.get(langLeft)}  name={langLeft} id={item.id} onChange={this.props.onItemChanged} />
                        </ReactBootstrap.Col>
                    ) : (
                        <ReactBootstrap.Col xs={6} md={6}>
                            <h4>{item.get(langLeft)}</h4>
                        </ReactBootstrap.Col>
                    );

                    var itemRightInstance = mode == "Edit" ? (
                        <ReactBootstrap.Col xs={4} md={4}>
                            <ReactBootstrap.Input bsSize="small" type="text" defaultValue={item.get(langRight)}  name={langRight} id={item.id} onChange={this.props.onItemChanged} />
                        </ReactBootstrap.Col>
                    ) : (
                        <ReactBootstrap.Col xs={6} md={6}>
                            <h4>{item.get(langRight)}</h4>
                        </ReactBootstrap.Col>
                    );

                    var categorySelectInstance = mode == "Edit" ? (
                        <ReactBootstrap.Col xs={2} md={2}>
                        <ReactBootstrap.Input type='select' bsSize="small" defaultValue={item.get("category")}  ref={item.id} id={item.id} onChange={this.props.onCategorySelected}>
                            {options}
                        </ReactBootstrap.Input>
                        </ReactBootstrap.Col>
                    ) : null;

                    return (
                        <ReactBootstrap.ListGroupItem bsStyle='info' key={item.cid}>

                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid'>
                                    {chekboxInstance}
                                    {itemLeftInstance}
                                    {itemRightInstance}
                                    {categorySelectInstance}
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

        return ItemsList;
    });

/*<ReactBootstrap.Glyphicon glyph='remove' />*/