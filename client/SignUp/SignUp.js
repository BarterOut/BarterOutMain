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
            window.location.href = '/login';
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
        <span className="inputLabel">First Name *</span>
        <input
          className="inputsForSignUp"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="firstName"
          required
        />
        <span className="inputLabel">Last Name *</span>
        <input
          className="inputsForSignUp"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="lastName"
          required
        />
        <span className="inputLabel">Email *</span>
        <input
          className="inputsForSignUp"
          placeholder=""
          type="email"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
          onChange={this.onChange.bind(this)}
          name="emailAddress"
          required
        />
        <span className="inputLabel">Venmo Username *</span>
        <input
          className="inputsForSignUp"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="venmoUsername"
          required
        />
        <span className="inputLabel">CMC Box *</span>
        <input
          className="inputsForSignUp"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="CMC"
          required
        />
        <div className="line">
          {/* <span className="inputLabel">Password</span> */}
          <input
            className="inputsForSignUp"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.onChange.bind(this)}
            required
          />
          {/* <span className="inputLabel">Confirm Password</span> */}
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
