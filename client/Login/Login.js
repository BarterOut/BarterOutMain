/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.1
 */

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      redirect: false,
    };
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
    if (this.state.emailAddress === '' ||
      this.state.password === '') {
      return;
    }
    axios.post('/api/auth/login', {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
    })
      .then((response) => {
        if (response.status === 200) {
          const user = response.data;
          sessionStorage.setItem('user', JSON.stringify(user));
          // update the state to redirect to home
          this.setState({ redirect: true });
        }
      }).catch((error) => {
        console.warn(`Error Loggin in: ${error}`);
      });
  }

  render() {
    if (sessionStorage.getItem('user') || this.state.redirect) {
      return (<Redirect to="/home" />);
    }
    return (
      <div className="login-wrapper">
        <h1>Login to BarterOut</h1>
        <input
          className="inputForLogin"
          onChange={this.onChange.bind(this)}
          placeholder="Email"
          type="email"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
          name="emailAddress"
          required
        />
        <input
          className="inputForLogin"
          onChange={this.onChange.bind(this)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button className="button" onClick={this.login.bind(this)}>Login</button>
        Don&apos;t have an account? <Link href="/signup" to="/signup">Sign Up</Link>
        <div>Back to <Link href="/" to="/">Home</Link></div>
      </div>
    );
  }
}

export default Login;
