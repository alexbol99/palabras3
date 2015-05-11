/**
 * Created by alexbol on 5/11/2015.
 */
define([],
    function () {
        const InfoPopup = React.createClass({
            render() {
                return (
                    <ReactBootstrap.Modal {...this.props} bsStyle='primary' title='Info' animation={false}>
                        <div className='modal-body'>
                            <h4>Palabras</h4>
                            <ReactBootstrap.Grid>
                                <ReactBootstrap.Row className='show-grid'>

                                    <ReactBootstrap.Col xs={2} md={2}>
                                        <img src="css/images/backbone-logo.png" title="backbone logo" width="50" />
                                    </ReactBootstrap.Col>

                                    <ReactBootstrap.Col xs={2} md={2}>
                                        <img src="css/images/react.png" title="react logo" width="50" />
                                    </ReactBootstrap.Col>

                                    <ReactBootstrap.Col xs={2} md={2}>
                                        <img src="css/images/parse.png" title="parse logo" width="50" />
                                    </ReactBootstrap.Col>

                                </ReactBootstrap.Row>
                            </ReactBootstrap.Grid>
                        </div>
                        <div className='modal-footer'>
                            <ReactBootstrap.Button onClick={this.props.onRequestHide}>Close</ReactBootstrap.Button>
                        </div>
                    </ReactBootstrap.Modal>
                );
            }
        });

        return InfoPopup;
    });
