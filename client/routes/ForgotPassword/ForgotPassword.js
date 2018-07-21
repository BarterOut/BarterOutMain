/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import logo from '../../images/barterOutOrangeWhiteLogo.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      redirect: false,
      badCreditials: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.setRedirect();
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  setRedirect() {
    if (!this.Auth.isTokenExpired(this.Auth.getToken)) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.resetPassword();
    }
  }

  resetPassword() {
    if (!this._validateInputs()) {
      return;
    }

    FetchService.POST('/api/auth/passwordResetRequest', {
      emailAddress: this.state.emailAddress,
    });
      // .then(() => {
      //   this.setState({ badCreditials: false });
      //   this.setState({ redirect: true });
      // }).catch((error) => {
      //   if (error.status === 401) {
      //     this.setState({ badCreditials: true });
      //   }
      // });
  }

  _validateInputs() {
    if (this.state.emailAddress === '') {
      this.setState({ badCreditials: true });
      return false;
    }
    return true;
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/home" />);
    }
    return (
      <div className="login-wrapper">
        <div className="leftLoginContent">
          <h1>Welcome to</h1>
          <img src={logo} alt="logo" />
        </div>
        <div className="rightLoginContent">
          <h2 id="login-header">Forgot your Password?</h2>
          <h2 id="login-header">
            No worries! Enter your email and 
            we will send you a password reset link:
          </h2>
          {this.state.badCreditials && <span className="input-error">Please enter an email!</span>}
          <input
            className="formInputLoginSignup"
            onChange={this.onChange.bind(this)}
            placeholder="Email"
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            name="emailAddress"
            required
          />
          <div>
            <button className="inputButtonFilled" onClick={this.resetPassword.bind(this)}>Reset Password</button>
          </div>
          <div>Don&apos;t have an account?</div>
          <div><Link href="/signup" to="/signup">Sign up now</Link>.</div>
        </div>
      </div>
    );
  }
}

export default Login;
