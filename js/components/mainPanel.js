/**
 * Created by alexbol on 5/12/2015.
 */
define(['components/menu'],
    function (Menu) {
        var MainPanel = React.createClass({
            render: function () {
                var selectedTitle = this.props.dictionary.get('name').substr(0,23) + ' > ';
                selectedTitle += this.props.selectionMode == "all" ?
                    this.props.numWeeksBefore + " weeks" : this.props.selectedCategoryName.substr(0,15);

                var header = (
                    <h6>
                        {selectedTitle}   <ReactBootstrap.Badge>{this.props.selectedCategoryCount}</ReactBootstrap.Badge>
                    </h6>
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
/* "All new words in last " + */
/*
<div className="text-right" >
    <ReactBootstrap.Button bsStyle='primary' bsSize='medium' onClick={this.sort}>
        <ReactBootstrap.Glyphicon glyph='plus' />
    </ReactBootstrap.Button>
</div>
*/
/*style={{position:'relative',top:'-10vh',marginRight:'5vh'}}*/