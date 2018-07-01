/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

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

    console.log(this.state);

    Auth.login(this.state.emailAddress, this.state.password)
      .then((response) => {
        console.log(response);
        this.setState({ redirect: true });
        if (response.status === 200) {
          // Update the state to redirect to home
          this.setState({ badCreditials: false });
          this.setState({ redirect: true });
        }
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
        <h1 id="login-header">Login to BarterOut</h1>
        {this.state.badCreditials && <span>Incorrect Username or Password</span>}
        <input
          className="input"
          onChange={this.onChange.bind(this)}
          placeholder="Email"
          type="email"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
          name="emailAddress"
          required
        />
        <input
          className="input"
          onChange={this.onChange.bind(this)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button className="button" onClick={this.login.bind(this)}>Login</button>
        <div>Don&apos;t have an account? <Link href="/signup" to="/signup">Sign Up</Link></div>
        <div>Back to <Link href="/" to="/">Home</Link>.</div>
      </div>
    );
  }
}

export default Login;
