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

                var langLeft = this.props.dictionary.get('language1').get('name');   // "spanish";
                var langRight = this.props.dictionary.get('language2').get('name');  // "russian";
                var langLeftLocal = this.props.dictionary.get('language1').get('localName');   // "spanish";
                var langRightLocal = this.props.dictionary.get('language2').get('localName');  // "russian";

                var header = (
                    <h6>
                        {selectedTitle}   <ReactBootstrap.Badge>{this.props.selectedCategoryCount}</ReactBootstrap.Badge>
                    </h6>
                );

                var listHeaderLangColWidth = this.props.mode == 'Edit' ? 3 : 6;

                var listHeaderSortLeftButtonInstance = this.props.mode == 'Edit' ? (
                    <ReactBootstrap.Col xs={1} md={1} style={{marginTop: '8px'}}>
                        <span id={langLeft} title="sort items" onClick={this.props.onSortItemsButtonClicked}>
                            <ReactBootstrap.Glyphicon glyph='sort-by-alphabet' title="sort A-Z" />
                        </span>
                    </ReactBootstrap.Col>
                ) : null;

                var listHeaderSortRightButtonInstance = this.props.mode == 'Edit' ? (
                    <ReactBootstrap.Col xs={1} md={1} style={{marginTop: '8px'}}>
                        <span id={langRight} title="sort items" onClick={this.props.onSortItemsButtonClicked}>
                            <ReactBootstrap.Glyphicon glyph='sort-by-alphabet' title="sort A-Z" />
                        </span>
                    </ReactBootstrap.Col>
                ) : null;

                var listHeaderInstance = (
                    <ReactBootstrap.Grid>
                        <ReactBootstrap.Row className='show-grid'>
                            <ReactBootstrap.Col xs={listHeaderLangColWidth} md={listHeaderLangColWidth}>
                                <h4 >{langLeftLocal}</h4>
                            </ReactBootstrap.Col>

                            {listHeaderSortLeftButtonInstance}

                            <ReactBootstrap.Col xs={listHeaderLangColWidth} md={listHeaderLangColWidth}>
                                <h4 >{langRightLocal}</h4>
                            </ReactBootstrap.Col>

                            {listHeaderSortRightButtonInstance}

                        </ReactBootstrap.Row>
                    </ReactBootstrap.Grid>
                );


                const panelInstance = (
                    <ReactBootstrap.Panel header={header} bsStyle='warning'>
                        {listHeaderInstance}
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