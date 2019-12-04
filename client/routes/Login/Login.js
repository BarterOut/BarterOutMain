/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

import logo from '../../images/logo-orange.png';

import './Login.css';
import '../../barterout.css';
import FetchService from '../../services/FetchService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      redirect: false,
      badCreditials: false,
    };

    this.login = this.login.bind(this);
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
    if (!AuthService.isTokenExpired(AuthService.getToken())) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  login() {
    if (!this._validateInputs()) {
      return;
    }

    const { emailAddress } = this.state;
    const { password } = this.state;

    FetchService.POST(
      '/api/auth/login',
      { emailAddress, password },
      false,
    )
      .then((data) => {
        AuthService.setToken(data.token);
        this.setState({ badCreditials: false });
        this.setState({ redirect: true });
      })
      .catch(() => {
        this.setState({ badCreditials: true });
      });
  }

  _validateInputs() {
    if (this.state.emailAddress === ''
      || this.state.password === '') {
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
          <Link to="/" href="/"><img className="wide-logo" src={logo} alt="logo" /></Link>
        </div>
        <div className="rightLoginContent">
          <h2 id="login-header">
          Log In
          </h2>
          {this.state.badCreditials && <span className="input-error">Incorrect Username or Password</span>}
          <span className="inputLabel">Email</span>
          <input
            className="formInputLoginSignup"
            onChange={this.onChange}
            placeholder="Email"
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            name="emailAddress"
            required
          />
          <span className="inputLabel">Password</span>
          <input
            className="formInputLoginSignup"
            onChange={this.onChange}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <div className="login-prefs">
            <Link className="forgot-password" href="/forgot-password" to="/forgot-password">Forgot Password?</Link>
            <div>
              Back to&nbsp;
              <Link href="/" to="/">Home</Link>
              .
            </div>
          </div>
          <div>
            <button type="button" className="inputButtonFilled" onClick={this.login}>Log In</button>
            <Link href="/signup" to="/signup">
              <button type="button" className="inputButton">Sign Up</button>
            </Link>
          </div>
          <div className="legal-links-login">
            <Link className="fine-print-login" href="/terms-of-service" to="/terms-of-service">Terms of Service</Link>
            |
            <Link className="fine-print-login" href="/privacy-policy" to="/privacy-policy"> Privacy Policy</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
