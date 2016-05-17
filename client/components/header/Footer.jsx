/*******************************************************************************
 * Copyright (C) 2015 ZenID Inc.
 *
 * Creator: Chen Li<chen.li@noc-land.com>
 * Creation Date: 2015-5-11
 *
 * Footer component
 *******************************************************************************/
const styles = {
  container: {
    //position: "fixed",
    position: "absolute",
    bottom: "20px",
    width: "100%",
    textAlign: "center",
    color: "#AEBDC9",
    //marginBottom:"20px",
  },
};

var Footer = React.createClass({
  propTypes: {
    //location: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    intl: React.PropTypes.object.isRequired,
  },

  render(){
    messages = this.context.intl.messages.header;

    return (<div style={styles.container}>
          <p>
            ©2016 Octokey | O钥匙 - <a href="http://webscan.360.cn/index/checkwebsite/url/oyaoshi.com"
                                     name="9b4249c04b2e8136624aa54bdae090f9"
                                     style={{color:"#AEBDC9"}}>360安全验证满分网站
          </a> | 鲁 ICP 备 16008215 号
          </p>
        </div>
    )
  },
});

module.exports = Footer;