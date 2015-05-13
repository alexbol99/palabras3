/**
 * Created by alexbol on 5/11/2015.
 */
define([],
    function () {
        var MySelect = React.createClass({
            addedBeforeChanged: function(event) {
                console.log(event.target.value)
            },
            render: function () {
                var Input = ReactBootstrap.Input;
                var ListGroupItem = ReactBootstrap.ListGroupItem;
                var selectedCategoryName = "";
                if (this.props.selectedCategory) {
                    selectedCategoryName = this.props.selectedCategory.get("category");
                }
                var label = 'Select only new words added in the last ' + this.props.numWeeksBefore + ' weeks';
                var numWeeksBeforeDisabled = selectedCategoryName != "All";
                var options = this.props.data.map(function (item) {
                    return (
                        <option bsStyle='success' value={item.get('category')} key={item.get('category')} >
                            {item.get('category') + " (" + item.get('count') + ')'}
                        </option>
                    )
                });
                const selectInstance = (
                    <form>
                        <ReactBootstrap.Input type='select' label='Categories' placeholder='select' defaultValue={selectedCategoryName} onChange={this.props.onCategorySelected}>
                            {options}
                        </ReactBootstrap.Input>
                        <ReactBootstrap.Input type='number' min='1' max='54' label={label} defaultValue={this.props.numWeeksBefore} disabled={numWeeksBeforeDisabled}
                            onChange={this.props.onNumWeeksBeforeChanged} />
                    </form>
                );
                return selectInstance;
            }
        });

        const ItemsFilterPopup = React.createClass({
            render: function() {
                const myselectInstance = (
                    <MySelect data={this.props.categories} ref="categories"
                        selectedCategory = {this.props.selectedCategory}
                        numWeeksBefore = {this.props.numWeeksBefore}
                        onCategorySelected = {this.props.onCategorySelected}
                        onNumWeeksBeforeChanged = {this.props.onNumWeeksBeforeChanged}
                    />
                );

                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title='Filter' animation={true}>
                        <div className='modal-body'>

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
