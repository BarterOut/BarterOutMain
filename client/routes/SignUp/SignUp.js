/**
 * @file React component for signing users up.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import FetchService from '../../services/FetchService';
import VerifyService from '../../services/VerifyService';
import logo from '../../images/logo-orange.png';

import './SignUp.css';
import '../../barterout.css';

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
      redirectToSuccess: false,
      allFilledOut: true,
      passwordsMatch: true,
    };

    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    if (evt.target.name === 'password') { this.updatePasswordStrength(evt); }
  }

  updatePasswordStrength(evt) {
    const strength = VerifyService.getPasswordStrength(evt.target.value);
    const strengthElement = document.getElementsByClassName('password-strength')[0];
    strengthElement.style.width = `${strength * 10}%`;
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

    if (this._validateInputs()) {
      FetchService.POST('/api/auth/signup', {
        emailAddress: this.state.emailAddress,
        password: this.state.password,
        venmoUsername: this.state.venmoUsername,
        firstName: this.state.firstName,
        university: this.state.university,
        lastName: this.state.lastName,
        CMC: this.state.CMC,
      })
        .then(() => {
          this.setState({ redirectToSuccess: true });
        });
    }
  }

  _validateInputs() {
    let allGood = true;
    this.setState(state => ({ emailAddress: state.emailAddress.toLowerCase() }));

    if (!VerifyService.verifyPasswords(this.state.passwordConfirm, this.state.password)) {
      this.setState({ passwordsMatch: false });
      allGood = false;
    } else {
      this.setState({ passwordsMatch: true });
    }

    if (!this.state.emailAddress.includes('@')) {
      this.setState({ allFilledOut: false });
      allGood = false;
    }

    if (!VerifyService.verifyEmail(this.state.emailAddress)) {
      this.setState({ allFilledOut: false });
      allGood = false;
    }
    return allGood;
  }

  render() {
    if (this.state.redirectToSuccess) {
      return <Redirect to="/sign-up-success" />;
    }
    return (
      <div className="login-wrapper">
        <div className="leftLoginContent">
          <h1>Welcome to</h1>
          <img className="wide-logo" src={logo} alt="logo" />
        </div>

        <div className="rightLoginContent">
          <h3>Create an Account</h3>
          {!this.state.allFilledOut && <h4 className="input-error"><em>Please ensure all the required fields are filled out.</em></h4>}

          <label htmlFor="firstName" aria-labelledby="firstName">
            First Name*
            <input
              className="form-control"
              placeholder="John"
              id="firstName"
              type="text"
              onChange={this.onChange}
              name="firstName"
              required
            />
          </label>

          <label htmlFor="lastName" aria-labelledby="lastName">
            Last Name*
            <input
              className="form-control"
              placeholder="Smith"
              type="text"
              id="lastName"
              onChange={this.onChange}
              name="lastName"
              required
            />
          </label>

          <label htmlFor="email" aria-labelledby="email">
            Email Address*&nbsp;
            <em>(must be UR email)</em>
            <input
              className="form-control"
              placeholder="john@u.rochester.edu"
              type="email"
              id="email"
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
              onChange={this.onChange}
              name="emailAddress"
              required
            />
          </label>

          <label htmlFor="university" aria-labelledby="university">
            University*
            <select onChange={this.selectChange} className="form-control" id="university">
              <option value="University of Rochester">University of Rochester</option>
            </select>
          </label>

          <label htmlFor="venmo" aria-labelledby="venmo">
            Venmo Username&nbsp;
            <em>(no @)</em>
            <input
              className="form-control"
              placeholder="John-Smith"
              type="text"
              id="venmo"
              onChange={this.onChange}
              name="venmoUsername"
              required
            />
          </label>

          <label htmlFor="cmc" aria-labelledby="cmc">
            CMC Box Number&nbsp;
            <em>(6 digits)</em>
            <input
              className="form-control"
              placeholder="123456"
              type="number"
              id="cmc"
              onChange={this.onChange}
              name="CMC"
              required
            />
          </label>

          {!this.state.passwordsMatch && <h4 className="input-error">Please make sure your passwords are the same!</h4>}
          <div className="line">
            <label htmlFor="password" aria-labelledby="password">
              Password*
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                onChange={this.onChange}
                required
              />
            </label>
            <label htmlFor="passwordConfirm" aria-labelledby="passwordConfirm">
              Confirm Password*
              <input
                className="form-control"
                placeholder="Confirm Password"
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                onChange={this.onChange}
                required
              />
            </label>
          </div>
          <div className="password-strength" />
          <div className="terms">
            By clicking &quot;Sign Up&quot; below, you are agreeing to our&nbsp;
            <a href="/terms-of-service" target="_blank" rel="noopener">Terms of Service</a>
            &nbsp;and&nbsp;
            <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
            &nbsp;.
          </div>
          <button
            className="inputButtonFilled"
            type="submit"
            onClick={this.signUp}
          >
          Sign Up
          </button>

          <span>
            Back to&nbsp;
            <Link href="/" to="/">Home</Link>
          </span>
        </div>
      </div>
    );
  }
}

export default SignUp;
