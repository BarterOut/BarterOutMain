/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import logo from '../../images/BarterOutDarkLogo.png';

import './ForgotPassword.css';

class ForgotPassword extends Component {
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
    })
      .then(() => {
        this.setState({ badCreditials: false });
        this.setState({ redirect: true });
      }).catch(() => {
        this.setState({ badCreditials: true });
      });
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
      return (<Redirect to="/forgotPasswordSuccess" />);
    }
    return (
      <div className="wrapper-soft-bg">
        <div className="top-section">
          <img className="logo-nonav" src={logo} alt="logo" />
          <Link to="/login" href="/login"><button className="button">Back to Log In</button></Link>
        </div>
        <div className="central-content-card">
          <MaterialIcon icon="lock" id="lock-icon" />
          <h2 id="header-custom">Forgot your Password?</h2>
          <h3 id="forgot-password-message">
            No worries! Enter your email and
            we will send you a password reset link:
          </h3>
          {this.state.badCreditials && <span className="input-error">Please enter an valid email.</span>}
          <input
            className="formInputForgotPassword"
            onChange={this.onChange.bind(this)}
            placeholder="Email"
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            name="emailAddress"
            required
          />
          <div>
            <button className="button" onClick={this.resetPassword.bind(this)}>Reset Password</button>
          </div>
          <div>Don&apos;t have an account?</div>
          <div><Link href="/signup" to="/signup">Sign up now</Link>.</div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
