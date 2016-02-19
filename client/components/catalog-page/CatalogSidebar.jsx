/*******************************************************************************
 * Copyright (C) 2015 ZenID Inc.
 *
 * Creator: Chen Li<chen.li@noc-land.com>
 * Creation Date: 2015-12-26
 *
 * Catalog Side Bar component - called by "Catalog"
 *******************************************************************************/
const {
    List,
    ListItem,
    RaisedButton,
    Divider,
    Paper} = MUI;
const {
    ActionSearch,
    ContentInbox,
    PlacesAllInclusive,
    CommunicationForum,
    ImageAudiotrack,
    HardwareVideogameAsset} = SvgIcons;

CatalogSideBar = React.createClass({
    propTypes: {
        zenCategories: React.PropTypes.array.isRequired,
        zenApps: React.PropTypes.array.isRequired,
        subscribeList: React.PropTypes.array.isRequired,
    },

    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            currentUser: Meteor.user()
        }
    },

    render(){
        let createPublicAppButton = isAdmin(this.data.currentUser) ?
            <CreateZenAppButton zenCategories={this.props.zenCategories}/> : null;
        let createCategoryButton = isAdmin(this.data.currentUser) ?
            <CreateCategoryButton zenCategories={this.props.zenCategories}/> : null;

        //Todo Add search box
        return <div>
            <Paper zDepth={1}
                   style={{
             backgroundColor:"#ffffff",

             padding:0,
             borderRadius:"5px"}}>
                <SearchBox zenApps = {this.props.zenApps}
                           subscribeList={this.props.subscribeList}
                />
                {/*<Divider />*/}
                {createPublicAppButton}
                <CreatePrivateAppButton/>
                <Divider />
                <CategoryList zenCategories={this.props.zenCategories}/>
                {createCategoryButton}
            </Paper>
        </div>
    },

});