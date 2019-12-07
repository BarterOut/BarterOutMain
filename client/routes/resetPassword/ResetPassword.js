/**
 * @file React component for users when the click the forgot password
 * link in their email.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import propTypes from 'prop-types';
import MaterialIcon from 'react-google-material-icons';

import FetchService from '../../services/FetchService';

import logo from '../../images/logo-orange.png';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      badCreditials: false,
      passwordConfirm: '',
      password: '',
    };

    this.resetPassword = this.resetPassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
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

    FetchService.POST('/api/auth/passwordReset/', {
      password: this.state.password,
      token: this.props.match.params.resetToken,
    })
      .then(() => {
        this.setState({ badCreditials: false });
        this.setState({ redirect: true });
      })
      .catch(() => {
        this.setState({ badCreditials: true });
      });
  }

  _validateInputs() {
    if (this.state.passwordConfirm === '') {
      this.setState({ badCreditials: true });
      return false;
    }
    if (this.state.password === '') {
      return false;
    }
    if (!(this.state.password === this.state.passwordConfirm)) {
      return false;
    }
    return true;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
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
            No worries! Enter your new password!
          </p>
          {this.state.badCreditials && <span className="input-error">Please enter an valid email.</span>}

          <input
            className="form-control my-2"
            placeholder="New Password"
            type="password"
            name="password"
            onChange={this.onChange}
            required
          />
          <input
            className="form-control my-2"
            placeholder="Confirm New Password"
            type="password"
            name="passwordConfirm"
            onChange={this.onChange}
            required
          />
          <div>
            <button type="button" className="btn btn-primary my-2" onClick={this.resetPassword}>Reset Password</button>
          </div>
          <div>Don&apos;t have an account?</div>
          <div>
            <Link href="/signup" to="/signup">Sign up now</Link>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: propTypes.object, // eslint-disable-line
};

export default ResetPassword;
