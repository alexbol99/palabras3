/**
 * Created by alexbol on 5/12/2015.
 */
define(['components/menu'],
    function (Menu) {
        var MainPanel = React.createClass({
            render: function () {
                var selectedCategoryName = "";
                var selectedCategoryCount = 0;
                if (this.props.selectedCategory) {
                    selectedCategoryName = this.props.selectedCategory.get("category");
                    selectedCategoryCount = this.props.selectedCategory.get("count");
                }

                var selectedTitle = selectedCategoryName == "All" ?
                    "All new words in last " + this.props.numWeeksBefore + " weeks" :
                    selectedCategoryName;

                var header = (
                    <div>
                        {selectedTitle}   <ReactBootstrap.Badge>{selectedCategoryCount}</ReactBootstrap.Badge>
                    </div>
                );

                var footer = (
                    <Menu />
                )

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