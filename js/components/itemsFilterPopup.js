/**
 * Created by alexbol on 5/11/2015.
 */
define([],
    function () {
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

        const ItemsFilterPopup = React.createClass({
            render: function() {
                const myselectInstance = (
                    <MySelect data={this.props.categories} ref="categories"
                        onCategorySelected = {this.props.onCategorySelected}
                    />
                );

                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title='Filter dictionary' animation={true}>
                        <div className='modal-body'>
                            <h4>Text in a modal</h4>

                            {myselectInstance}

                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.onRequestHide}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        return ItemsFilterPopup;
});
