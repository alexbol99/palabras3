/**
 * Created by alexbol on 6/10/2015.
 */
define([],
    function () {
        const ConfirmPopup = React.createClass({
            render() {
                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title={this.props.title} animation={true}
                        onRequestHide={this.props.hidePopup}>
                        <div className='modal-body'>
                            {this.props.message}
                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.onConfirm}>OK</ReactBootstrap.Button>
                            <ReactBootstrap.Button onClick={this.props.onCancel}>Cancel</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        return ConfirmPopup;
    });
