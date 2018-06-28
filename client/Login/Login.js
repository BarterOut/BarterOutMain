/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

// TODO: Use auth service login function instead of axios

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
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
    if (this.state.emailAddress === '' ||
      this.state.password === '') {
      return;
    }

    const Auth = new AuthService();

    Auth.login(this.state.emailAddress, this.state.password)
      .then((response) => {
        if (response.status === 200) {
          const user = response.data;
          sessionStorage.setItem('token', JSON.stringify(user.token));
          // Update the state to redirect to home
          this.setState({ redirect: true });
        }
      }).catch((error) => {
        if (error.status === 401) {
          this.setState({ badCreditials: true });
        }
      });

    // axios.post('/api/auth/login', {
    //   emailAddress: this.state.emailAddress,
    //   password: this.state.password,
    // })
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
