/**
 * @file React component for signing users up.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './SignUp.css';
import '../baseStyles.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      university: 'University of Rochester',
      CMC: '',
      venmoUsername: '',
      success: false,
      allFilledOut: true,
      passwordsMatch: true,
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
      this.signUp();
    }
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ university: evt.target[index].value });
  }

  signUp() {
    this.setState({ passwordsMatch: true });
    this.setState({ allFilledOut: true });

    if (!this._validateInputs()) {
      return;
    }

    axios.post('/api/auth/signup', {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
      venmoUsername: this.state.venmoUsername,
      firstName: this.state.firstName,
      univeristy: this.state.university,
      lastName: this.state.lastName,
      CMC: this.state.CMC,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          this.setState({ success: true });
        }
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
  }

  _validateInputs() {
    if (!(this.state.passwordConfirm === this.state.password)) {
      this.setState({ passwordsMatch: false });
      const $password = document.getElementsByName('password')[0];
      const $passwordConfirm = document.getElementsByName('passwordConfirm')[0];

      $password.className = '';
      $password.className = 'badInput';

      $passwordConfirm.className = '';
      $passwordConfirm.className = 'badInput';

      return false;
    }

    if (!this.state.emailAddress.includes('@')) {
      this.setState({ allFilledOut: false });
      return false;
    }

    // This is only temporary since we only allow U of R students currently.
    const checkerEmail = this.state.emailAddress.split('@')[1];

    if (checkerEmail !== 'u.rochester.edu' && checkerEmail !== 'rochester.edu') {
      const $emailAddress = document.getElementsByName('emailAddress')[0];

      $emailAddress.className = '';
      $emailAddress.className = 'badInput';
      this.setState({ allFilledOut: false });
      return false;
    }

    let allGood = true;
    const inputsArray = document.getElementsByClassName('input');
    for (let i = 0; i < inputsArray.length; i++) {
      if (inputsArray[i].value === '') {
        this.setState({ allFilledOut: false });
        allGood = false;
        inputsArray[i].className = 'badInput';
      }
    }

    return allGood;
  }

  render() {
    return (
      <div className="login-wrapper">
        <h1>Sign up for BarterOut</h1>
        {this.state.success && <h3>Thanks for signing up, before logging in, please check your email to verify your account!</h3>}
        {!this.state.allFilledOut && <h4 className="signup-error">Please ensure all the required fields are filled out.</h4>}
        <span className="inputLabel">First Name *</span>
        <input
          className="input"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="firstName"
          required
        />
        <span className="inputLabel">Last Name *</span>
        <input
          className="input"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="lastName"
          required
        />
        <span className="inputLabel">Email *</span>
        <input
          className="input"
          placeholder=""
          type="email"
          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
          onChange={this.onChange.bind(this)}
          name="emailAddress"
          required
        />
        <span className="inputLabel">University *</span>
        <select onChange={this.selectChange.bind(this)}>
          <option value="University of Rochester">University of Rochester</option>
        </select>
        <span className="inputLabel">Venmo Username *</span>
        <input
          className="input"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="venmoUsername"
          required
        />
        <span className="inputLabel">CMC Box Number *</span>
        <input
          className="input"
          placeholder=""
          type="number"
          onChange={this.onChange.bind(this)}
          name="CMC"
          required
        />
        {!this.state.passwordsMatch && <h4 className="signup-error">Please make sure your passwords are the same!</h4>}
        <div className="line">
          <input
            className="input"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.onChange.bind(this)}
            required
          />
          <input
            className="input"
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            onChange={this.onChange.bind(this)}
            required
          />
        </div>
        <div className="terms">
            By clicking "Sign Up" below, you are agreeing to our <a href="/termsOfService" target="_blank" rel="noopener"> Terms of Service </a>
            and <a href="/privacyPolicy" target="_blank" rel="noopener"> Privacy Policy</a>.
        </div>
        <button
          className="button"
          type="submit"
          onClick={this.signUp.bind(this)}
        >Sign Up
        </button>

        <span>Back to <Link href="/login" to="/login">Login</Link></span>
      </div>
    );
  }
}

export default SignUp;
