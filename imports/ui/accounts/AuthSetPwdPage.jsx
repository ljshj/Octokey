/*******************************************************************************
 * Copyright (C) 2015-2016 Octokey Inc.
 *
 * Creator: Chen Li<yichen.li0830@gmail.com>
 * Creation Date: 2015-2-2
 *
 * Sign-up page component, called by "routes"
 *******************************************************************************/
import React from "react";

import {Link} from "react-router";

import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Col from "antd/lib/col";

const style = {
  paper: {
    paddingTop: 30,
    paddingBottom: 50,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 25,
    marginBottom: 10,
    width: "70%",
  },
  logo: {
    display: "block",
    margin: "auto",
    height: 150,
  }
};

var AuthSetPwdPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    intl: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      floatingUserText: "",
      floatingPassText: "",
      disableBtn: false,
    };
  },

  render() {
    const {messages} = this.context.intl;

    const logo = (
        <Link to="/"><img style={style.logo} src="/img/logo.svg"/></Link>
    );

    return (<Col sm={6} smOffset={3} md={4} mdOffset={4} xs={12}>
          <Paper style={style.paper} zDepth={1}>
            <form >

              {logo}

              <input style={{display:"none"}} type="text" name="fakeusernameremembered"/>
              <input style={{display:"none"}} type="password" name="fakepasswordremembered"/>

              <TextField
                  ref="email"
                  style={{fontWeight:"300"}}
                  floatingLabelStyle={{fontWeight:"300"}}
                  errorText={this.state.floatingUserText}
                  hintText={messages.login_email}
                  onKeyPress={(e)=>{e.key === 'Enter' && this.handleSubmit()}}
              />
              <br/>
              <TextField
                  ref="password"
                  type="password"
                  style={{fontWeight:"300"}}
                  floatingLabelStyle={{fontWeight:"300"}}
                  errorText={this.state.floatingPassText}
                  hintText={messages.login_password}
                  onKeyPress={(e)=>{e.key === 'Enter' && this.handleSubmit()}}
              />
            </form>

            <RaisedButton label={messages.login_signUp}
                          onClick={this.handleSubmit}
                          style={style.registerButton}
                          primary={ true }
                          disabled={this.state.disableBtn}/>
            <p>{messages.login_haveAccount}<Link to="/login">{messages.login_signIn_low}</Link></p>
          </Paper>
        </Col>
    );
  },

  handleInputErrorCheckUser(){
    let email = this.refs.email.getValue();
    if (!email) {
      this.setState({floatingUserText: this.context.intl.messages.login_emailEmpty});
    }
    else if (!OctoClientAPI.isValidateEmail(email)) {
      this.setState({floatingUserText: this.context.intl.messages.login_emailFormatError});
    }
    else {
      this.setState({floatingUserText: ""});
      return true;
    }
    return false;
  },

  handleInputErrorCheckPass(){
    let password = this.refs.password.getValue();
    if (!password) {
      this.setState({floatingPassText: this.context.intl.messages.login_pwdEmpty});
    } else {
      this.setState({floatingPassText: ""});
      return true;
    }
    return false;
  },

  handleSubmit(){
    /* Error check */
    const noInputError = this.handleInputErrorCheckUser() && this.handleInputErrorCheckPass();

    /* Save data & Handle login */
    let email = this.refs.email.getValue();
    let password = this.refs.password.getValue();

    Meteor.call("emailIsAvailable", email, function (error, emailAvailable) {
      console.log("error", error);
      console.log("emailAvailable", emailAvailable);
      if (emailAvailable) {
        console.log("email is available");
      }
      else {
        console.log("email is not available");
      }
    });
  }
});

module.exports = AuthSetPwdPage;