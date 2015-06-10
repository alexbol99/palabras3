/**
 * Created by alexbol on 5/12/2015.
 */
define(['components/menu'],
    function (Menu) {
        var MainPanel = React.createClass({
            render: function () {
                var selectedTitle = this.props.selectionMode == "all" ?
                    "All new words in last " + this.props.numWeeksBefore + " weeks" :
                    this.props.selectedCategoryName;

                var header = (
                    <div>
                        {selectedTitle}   <ReactBootstrap.Badge>{this.props.selectedCategoryCount}</ReactBootstrap.Badge>
                    </div>
                );

                const panelInstance = (
                    <ReactBootstrap.Panel header={header} bsStyle='warning'>
                        {this.props.children}
                    </ReactBootstrap.Panel>
                );
                return panelInstance;
            }
        });

        return MainPanel;
    });
/*
<div className="text-right" >
    <ReactBootstrap.Button bsStyle='primary' bsSize='medium' onClick={this.sort}>
        <ReactBootstrap.Glyphicon glyph='plus' />
    </ReactBootstrap.Button>
</div>
*/
/*style={{position:'relative',top:'-10vh',marginRight:'5vh'}}*/