/**
 * @file React component for signing users up.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.1
 */

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
      university: 'University of Rochester',
      CMC: '',
      venmoUsername: '',
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
      this.signUp();
    }
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ university: evt.target[index].value });
  }

  signUp() {
    if (!(this.state.passwordConfirm === this.state.password)) {
      window.alert('Please make your passwords the same!');
      return;
    }

    const checkerEmail = this.state.emailAddress.split('@')[1];

    if (checkerEmail !== 'u.rochester.edu' && checkerEmail !== 'rochester.edu') {
      window.alert('Please user a school email account!');
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
      .then(() => {
        console.log('You have been signed up!');
        this.setState({ redirect: true });
        // window.location.reload();
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
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
        <span className="inputLabel">University *</span>
        <select onChange={this.selectChange.bind(this)}>
          <option value="University of Rochester">University of Rochester</option>
        </select>
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
