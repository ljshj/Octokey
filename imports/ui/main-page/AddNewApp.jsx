/*******************************************************************************
 * Copyright (C) 2015-2016 Octokey Inc.
 *
 * Creator: Chen Li<yichen.li0830@gmail.com>
 * Creation Date: 2015-12-26
 *
 * Dialog for Add New Account for an App, called when user haven't subscribe any app, called
 * by "AppsContainer" component.
 *******************************************************************************/
import React from "react";
import RaisedButton from "material-ui/RaisedButton";

var AddNewApp = React.createClass({
  propTypes: {
    whenClicked: React.PropTypes.func.isRequired,
  },

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  render(){
    return <div style={{paddingTop:"60px", paddingBottom:"60px", textAlign:"center"}}>
      <p style={{lineHeight:"30px"}}>{this.context.intl.messages.app_noAppMessage}</p>
      <RaisedButton primary={true}
                    label={this.context.intl.messages.app_noAppBtn}
                    onTouchTap={this.props.whenClicked}>
      </RaisedButton>
    </div>
  }
});

module.exports = AddNewApp;