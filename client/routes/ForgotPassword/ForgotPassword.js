/**
 * @file ForgotPassword.js
 * @description React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import logo from '../../images/barterOutOrangeWhiteLogoHeader.png';

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

    this.resetPassword = this.resetPassword.bind(this);
    this.onChange = this.onChange.bind(this);
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
      <div className="forgot-password">
        <nav className="headerBar">
          <div className="logo">
            <a href="/" className="buttonLink"><img alt="logo" className="logo" src={logo} /></a>
          </div>
          <div className="pageLinks">
            <Link className="landingPageLink" to="/" href="/">Home</Link>
            <Link className="landingPageLink" to="/about" href="/about">About</Link>
            <Link className="landingPageLink" to="/login" href="/login">Login</Link>
            <Link className="landingPageLink" to="/signup" href="/signup">Sign Up</Link>
          </div>
        </nav>
        <div className="forgot-password__content">
          <MaterialIcon size={100} icon="lock" id="lock-icon" />
          <h3>Forgot your Password?</h3>
          <p>
            No worries! Enter your email and
            we will send you a password reset link:
          </p>
          {
            this.state.badCreditials
            && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              Please enter valid email.
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            )
          }
          <input
            className="form-control"
            onChange={this.onChange}
            placeholder="Email"
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            name="emailAddress"
            required
          />
          <div>
            <button type="button" className="btn btn-primary my-2" onClick={this.resetPassword}>
              Reset Password
            </button>
          </div>
          <div>Don&apos;t have an account?</div>
          <div><Link href="/signup" to="/signup">Sign up now</Link>.</div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
