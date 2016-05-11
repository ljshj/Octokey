/*******************************************************************************
 * Copyright (C) 2015 ZenID Inc.
 *
 * Creator: Chen Li<chen.li@noc-land.com>
 * Creation Date: 2015-5-11
 *
 * Header Logo component, called by "Header" component
 *******************************************************************************/
const {Link} = ReactRouter;

var HeaderLogo = React.createClass({
  propTypes: {
    divStyle: React.PropTypes.object,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
    intl: React.PropTypes.object.isRequired,
  },

  render(){
    messages = this.context.intl.messages.header;
    const logo = (
        <Link to="/">
          <div style={_.extend({},{margin:"10px 10px 10px 30px"},this.props.divStyle)}>
            <img src="/img/logo.png"
                 style={{height: 40, verticalAlign:"top", color:Colors.grey800}}/>
            <div src="vertical-center"
                 style={{display:"inline-block",marginLeft:12, color:Colors.grey700}}>
              <h3>Octokey</h3>
              <p>O钥匙</p>
            </div>
          </div>
        </Link>
    );

    //console.log("account", account);
    return (logo)
  },
});

module.exports = HeaderLogo;