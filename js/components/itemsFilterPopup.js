/**
 * Created by alexbol on 5/11/2015.
 */
define([],
    function () {
       var ItemsFilterPopup = React.createClass({
            render: function() {
                var selectedCategoryName = this.props.selectedCategoryName;

                var label = 'Select only new words added in the last ' + this.props.numWeeksBefore + ' weeks';

                var options = this.props.categories.map(function (item) {
                    return (
                        <option bsStyle='success' value={item.get('category')} key={item.get('category')} >
                            {item.get('category') + " (" + item.get('count') + ')'}
                        </option>
                    )
                });

                var radioAllInstance = (this.props.selectionMode == 'all' ?
                    <ReactBootstrap.Input type='radio' name='selectionMode' label='All categories' value='all' checked onChange={this.props.onSelectionModeChange} /> :
                    <ReactBootstrap.Input type='radio' name='selectionMode' label='All categories' value='all' onChange={this.props.onSelectionModeChange} />);

                var radioSelectedInstance = (this.props.selectionMode == 'selected' ?
                    <ReactBootstrap.Input type='radio' name='selectionMode' label='Selected categories' value='selected' checked onChange={this.props.onSelectionModeChange}/> :
                    <ReactBootstrap.Input type='radio' name='selectionMode' label='Selected categories' value='selected' onChange={this.props.onSelectionModeChange}/>);

                var selectCategoriesDisabled = (this.props.selectionMode == 'all');
                var numWeeksBeforeDisabled = (this.props.selectionMode == 'selected');

                const filterFormInstance = (
                    <form>
                        <label className="radio-inline">
                            {radioAllInstance}
                        </label>
                        <label className="radio-inline">
                            {radioSelectedInstance}
                        </label>

                        <ReactBootstrap.Input type='select' label='Categories' placeholder='select' ref='selectCategory' defaultValue={selectedCategoryName} disabled={selectCategoriesDisabled}
                            onChange={this.props.onCategorySelected}>
                            {options}
                        </ReactBootstrap.Input>


                        <ReactBootstrap.Input type='number' min='1' max='54' label={label} ref='numWeeksBefore' defaultValue={this.props.numWeeksBefore} disabled={numWeeksBeforeDisabled}
                            onChange={this.props.onNumWeeksBeforeChanged} />
                    </form>
                );

                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title='Filter' animation={true}>
                        <div className='modal-body'>

                            {filterFormInstance}

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
