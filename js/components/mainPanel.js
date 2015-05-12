/**
 * Created by alexbol on 5/12/2015.
 */
define([],
    function () {
        var MainPanel = React.createClass({
            render: function () {
                var selectedCategoryName = "";
                var selectedCategoryCount = 0;
                if (this.props.selectedCategory) {
                    selectedCategoryName = this.props.selectedCategory.get("category");
                    selectedCategoryCount = this.props.selectedCategory.get("count");
                }

                var header = (
                    <div>
                        {selectedCategoryName}  <ReactBootstrap.Badge>{selectedCategoryCount}</ReactBootstrap.Badge>
                    </div>
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

