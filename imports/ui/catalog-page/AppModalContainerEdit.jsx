/*******************************************************************************
 * Copyright (C) 2015-2016 Octokey Inc.
 *
 * Creator: Chen Li<yichen.li0830@gmail.com>
 * Creation Date: 2015-3-26
 *
 * The container for CatalogAppModal component, called by CatalogSingleApp
 *******************************************************************************/ import React from "react"

const AppModal = require('./AppModal.jsx');

const AppModalContainerEdit = React.createClass({
  propTypes: {
    modalOpen: React.PropTypes.bool.isRequired,
    logoURL: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    loginLink: React.PropTypes.string.isRequired,
    registerLink: React.PropTypes.string.isRequired,
    appId: React.PropTypes.string.isRequired,
    selectedCategoryNames: React.PropTypes.array.isRequired,
    allCategories: React.PropTypes.array.isRequired,
    onModalClose: React.PropTypes.func.isRequired,
    //Todo add isRequired for the following props
    popUpLoginFlag: React.PropTypes.bool,
    homepageLink: React.PropTypes.string,
  },

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  getInitialState(){
    return {
      logoPreview: this.props.logoURL,
      selectedCategories: this.props.selectedCategoryNames,
    }
  },

  render(){
    const fileList = [{
      uid: -1,
      status: 'done',
      url: this.state.logoPreview
    }];

    return <AppModal
        modalTitle={"编辑网站"}
        okText={"编辑"}
        modalOpen={this.props.modalOpen}
        modalOnCancel={this.handleModalClose}
        modalOnOk={this.handleEditApp}
        onLogoUpload={this.handleLogoUpload}
        onLogoRemove={this.handleLogoRemove}
        fileList={fileList}
        initialAppName={this.props.appName}
        initialPopUpLoginFlag={this.props.popUpLoginFlag}
        initialHomepageLink={this.props.homepageLink}
        initialLoginLink={this.props.loginLink}
        initialRegisterLink={this.props.registerLink}
        allCategories={this.props.allCategories}
        selectedCategories={this.state.selectedCategories}
        onCellClick={this.handleCellClick}
    />
  },

  /**
   * Handle Public App Edit
   * @param {string} newLoginLink - The login link from modal form
   * @param {string} [newRegisterLink=""] - The register link from modal form
   * @param {string} newAppName  - The login link from modal form
   * @param {bool} newPopUpLoginFlag  - flag whether the user needs to click "登录" before actually
   * fill in credentials
   * @param {string} newHomepageLink - Home page link
   */
  handleEditApp(newLoginLink, newRegisterLink, newAppName, newPopUpLoginFlag, newHomepageLink){
    console.log("handleEditApp called");
    const newLogo = this.state.logoPreview;

    if (newLoginLink && newAppName /*&& newLogo !== ""*/ && newHomepageLink) {
      Meteor.call("updatePublicApp", this.props.appId, newAppName, newLoginLink, newRegisterLink,
          newLogo, this.state.selectedCategories, newPopUpLoginFlag, newHomepageLink,
          function (error, result) {
            if (error) {
              throw new Meteor.Error(error);
            }

            //Fetch updated data from publicApps collection
            OctoClientAPI.fetchDataToSession("allPublicApps", "getAllPublicApps");

            //Close modal
            this.props.onModalClose();
          }.bind(this));
    } else {
      alert(this.context.intl.messages.cata_createAppAlert);
    }
  },

  /**
   * To remove the logo from fileList
   */
  handleLogoRemove(){
    this.setState({logoPreview: ""});
  },

  /**
   * To preview the logo uploaded to the browser (the logo is not uploaded to the server yet)
   * @param {Blob} logoFile - The blob file uploaded
   * @returns {boolean} false - Stop the default action of antd 'Upload' component
   */
  handleLogoUpload(logoFile){
    OctoClientAPI.checkImageFile(logoFile, function (err, imageFile) {
      if (err) {
        alert("error: " + err);
      }
      else {
        this.setState({
          logoPreview: imageFile,
        });
      }
    }.bind(this));
    return false;
  },

  /**
   * Handle click on category cell, either select or un-select a category for an app
   * @param {string} rowNumber - Row number of clicked category
   * @param {string} columnId
   */
  handleCellClick(rowNumber, columnId){
    var selectedCategoryName = this.props.allCategories[rowNumber].name;
    var index = this.state.selectedCategories.indexOf(selectedCategoryName);
    //react state is immutable, use this variable to act as a temp var.
    var selectedCategories = this.state.selectedCategories;

    if (index > -1) {//already selected
      selectedCategories.splice(index, 1);
      this.setState({selectedCategories: selectedCategories});
    }
    else {
      selectedCategories.push(selectedCategoryName);
      this.setState({selectedCategories: selectedCategories});
    }
  },

  /**
   * Close the modal and set default state to app's database record
   */
  handleModalClose(){
    this.props.onModalClose();
    //Wait 0.5 sec to reset the state so that user won't see the change during the cancel animation
    setTimeout(()=> {
      this.setState({
        logoPreview: this.props.logoURL,
        selectedCategories: this.props.selectedCategoryNames,
      })
    }, 500);
  },

  /**
   * Handle remove a public app
   * @param {string} appId - the id of the to-be-removed app
   */
  /*handleRemoveApp(event){
   event.preventDefault();
   var delConfirm = confirm(this.context.intl.messages.cata_confirmDel);
   if (delConfirm) {
   Meteor.call("removePublicApp", this.state.editAppId, function (error, result) {
   if (error) {
   throw new Meteor.Error(error);
   }
   this.close();
   }.bind(this));
   }
   },*/
});

module.exports = AppModalContainerEdit;
