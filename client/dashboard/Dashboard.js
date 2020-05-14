/**
 * @file Dashboard.js
 * @description React component for logging users in to the dashboard.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import FetchService from '../services/FetchService';
import AuthService from '../services/AuthService';

import logo from '../images/logo-orange.png';

class Dashboard extends Component {
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
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  login() {
    const { emailAddress } = this.state;
    const { password } = this.state;

    FetchService.POST(
      '/api/auth/login',
      { emailAddress, password },
      false,
    )
      .then((data) => {
        AuthService.setToken(data.token);
        this.setState({ redirect: true });
      });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/dashboard/home" />);
    }
    return (
      <div className="login-wrapper">
        <div className="leftLoginContent">
          <h1>Welcome to</h1>
          <img className="wide-logo" src={logo} alt="logo" />
          <h1>Dashboard</h1>
        </div>
        <div className="rightLoginContent">
          <h2 id="login-header">
          Log In
          </h2>
          {this.state.badCreditials && <span className="input-error">Incorrect Username or Password</span>}
          <label htmlFor="email" aria-labelledby="email">
            Email
            <input
              className="form-control"
              onChange={this.onChange}
              placeholder="Email"
              id="email"
              type="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
              name="emailAddress"
              required
            />
          </label>
          <label htmlFor="password" aria-labelledby="password">
            Password
            <input
              className="form-control"
              onChange={this.onChange}
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              required
            />
          </label>
          <div className="login-prefs">
            <Link className="forgot-password" href="/forgot-password" to="/forgot-password">Forgot Password?</Link>
            <div>
              Back to&nbsp;
              <Link href="/" to="/">Home</Link>
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

export default Dashboard;
