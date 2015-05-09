/**
 * Created by Owner on 5/9/15.
 */

define([],
    function () {
        var MatchingQuiz = React.createClass({
            render: function () {
                var ListGroup = ReactBootstrap.ListGroup;
                var ListGroupItem = ReactBootstrap.ListGroupItem;
                var list = this.props.items.map(function (item) {
                    return (
                        <ListGroupItem bsStyle='info' key={item.get('spanish')}>
                            {item.get('spanish')}
                        </ListGroupItem>
                    )
                });
                const listgroupInstance = (
                    <ListGroup>
                        {list}
                    </ListGroup>
                );
                return listgroupInstance;
            }
        });

        return MatchingQuiz;
    });
