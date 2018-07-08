
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

import './EditPassword.css';
import '../baseStyles.css';


class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      newPassword: '',
      redirect: false,
    };
  }

  componentDidMount() {
    const auth = new AuthService();
    const token = auth.getToken();
    this.setState({ token: token });
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

  checkBox(evt) {
    console.log(evt.target);
  }



  updatePassword() {
    if (!(this.state.passwordConfirm === this.state.password)) {
      window.alert('Please make your passwords the same!');
      return;
    }
    axios.post('/api/auth/updatePassword', {
      password: this.state.password,
      newPassword: this.state.newPassword,
      token: this.state.token,
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
      return (<Redirect to="/home" />);
    }
    return (
      <div className="login-wrapper">
        <h1>Edit your Profile</h1>
          <input
            className="input"
            placeholder="Password"
            type="password"
            name="password"
            onChange={this.onChange.bind(this)}
            required
          />
          {/* <span className="inputLabel">Confirm Password</span> */}
          <input
            className="input"
            placeholder="Confirm Password"
            type="password"
            name="passwordConfirm"
            onChange={this.onChange.bind(this)}
            required
          />
          <input
            className="input"
            placeholder="New Password"
            type="password"
            name="newPassword"
            onChange={this.onChange.bind(this)}
            required
          />

        <button
          className="button"
          type="submit"
          onClick={this.updatePassword.bind(this)}
        >Update Password
        </button>

        <span>Back to <Link href="/login" to="/login">Login</Link></span>
      </div>
    );
  }
}

export default EditPassword;
