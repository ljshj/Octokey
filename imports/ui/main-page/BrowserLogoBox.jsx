/*******************************************************************************
 * Copyright (C) 2015-2016 Octokey Inc.
 *
 * Creator: Chen Li<yichen.li0830@gmail.com>
 * Creation Date: 2016-4-19
 *
 * Dialog to ask user to install plugin
 *******************************************************************************/
import React from "react";

const styles = {
  boxStyle: {
    margin: "20px 20px 0px 20px",
    display: "inline-block",
    cursor: "pointer",
  },
  imgStyle: {
    height: "85px",
  },
};

var BrowserLogoBox = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    logoPath: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  },

  contextTypes: {
    intl: React.PropTypes.object.isRequired,
  },

  render(){
    const {messages} = this.context.intl;

    return (
        <div style={styles.boxStyle} onClick={this.props.onClick}>
          <img src={this.props.logoPath} style={styles.imgStyle}/>
          <div style={{lineHeight:"35px"}}>
            {this.props.name}
          </div>
        </div>
    )
  },
});

module.exports = BrowserLogoBox;