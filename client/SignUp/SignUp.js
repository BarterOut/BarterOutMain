import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

import './SignUp.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      CMC: '',
      venmoUsername: '',
      redirect: false,
    };
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  signUp() {
    if (!(this.state.passwordConfirm === this.state.password)) {
      window.alert('Please make your passwords the same!');
    } else {
      axios.post('/api/auth/signup', {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        venmoUsername: this.state.venmoUsername,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        CMC: this.state.CMC,
      })
        .then((response) => {
          console.log(`Resp: ${response}`);
          if (!response.data.errmsg) {
            console.log('You have been signed up!');
            this.setState({ redirect: true });
          } else {
            console.warn('Duplicate');
          }
        })
        .catch((error) => {
          console.error(`Sign up server error: ${error}`);
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="login-wrapper">
        <h1>Sign up for BarterOut</h1>
        <div className="line">
          <input
            className="inputsForSignUp"
            placeholder="First Name"
            type="text"
            onChange={this.onChange.bind(this)}
            name="firstName"
            required
          />
          <input
            className="inputsForSignUp"
            placeholder="Last Name"
            type="text"
            onChange={this.onChange.bind(this)}
            name="lastName"
            required
          />
        </div>
        <div className="line">
          <input
            className="inputsForSignUp"
            placeholder="Email"
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            onChange={this.onChange.bind(this)}
            name="emailAddress"
            required
          />
          <input
            className="inputsForSignUp"
            placeholder="Venmo Username"
            type="text"
            onChange={this.onChange.bind(this)}
            name="venmoUsername"
            required
          />
        </div>
        <input
          className="inputsForSignUp"
          placeholder="CMC Box"
          type="text"
          onChange={this.onChange.bind(this)}
          name="CMC"
          required
        />
        <div className="line">
          <input
            className="inputsForSignUp"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.onChange.bind(this)}
            required
          />
          <input
            className="inputsForSignUp"
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            onChange={this.onChange.bind(this)}
            required
          />
        </div>
        <button
          className="button"
          type="submit"
          onClick={this.signUp.bind(this)}
        >SignUp
        </button>

        <span>Back to <Link href="/login" to="/login">Login</Link></span>
      </div>
    );
  }
}

export default SignUp;
