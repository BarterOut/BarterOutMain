/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

import logo from '../images/barterOutOrangeWhiteLogo.png';

import './Login.css';
import '../baseStyles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
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
      this.login();
    }
  }

  login() {
    if (!this._validateInputs()) {
      return;
    }

    const Auth = new AuthService();

    Auth.login(this.state.emailAddress, this.state.password)
      .then(() => {
        this.setState({ badCreditials: false });
        this.setState({ redirect: true });
      }).catch((error) => {
        if (error.status === 401) {
          this.setState({ badCreditials: true });
        }
      });
  }

  _validateInputs() {
    if (this.state.emailAddress === '' ||
      this.state.password === '') {
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
          <h2 id="login-header">Please enter you email and password to login.</h2>
          {this.state.badCreditials && <span className="input-error">Incorrect Username or Password</span>}
          <input
            className="formInputLoginSignup"
            onChange={this.onChange.bind(this)}
            placeholder="Email"
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            name="emailAddress"
            required
          />
          <input
            className="formInputLoginSignup"
            onChange={this.onChange.bind(this)}
            placeholder="Password"
            type="password"
            name="password"
            required
          />
          <div>
            <span>Remember me</span>
            Forgot Password
          </div>
          <div>
            <button className="inputButtonFilled" onClick={this.login.bind(this)}>Login</button>
            <Link href="/signup" to="/signup">
              <button className="inputButton">Sign Up</button>
            </Link>
          </div>
          <div>Back to <Link href="/" to="/">Home</Link>.</div>
        </div>
      </div>
    );
  }
}

export default Login;
