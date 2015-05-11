/**
 * Created by alexbol on 5/11/2015.
 */
define([],
    function () {
        const ItemsFilterPopup = React.createClass({
            render() {
                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title='Modal heading' animation={false}>
                        <div className='modal-body'>
                            <h4>Text in a modal</h4>
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
