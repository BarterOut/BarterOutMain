
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

import './EditProfile.css';
import '../baseStyles.css';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      CMC: '',
      venmoUsername: '',
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
      this.updateProfile();
    }
  }

  checkBox(evt) {
    console.log(evt.target);
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ university: evt.target[index].value });
  }

  updateProfile() {

    axios.post('/api/auth/updateProfile', {
      venmoUsername: this.state.venmoUsername,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      CMC: this.state.CMC,
      token: this.state.token,
    })
      .then(() => {
        console.log('You have updated your information');
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


        <span className="inputLabel">Venmo Username *</span>
        <input
          className="input"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="venmoUsername"
          required
        />
        <span className="inputLabel">CMC Box *</span>
        <input
          className="input"
          placeholder=""
          type="text"
          onChange={this.onChange.bind(this)}
          name="CMC"
          required
        />
        <button
          className="button"
          type="submit"
          onClick={this.updateProfile.bind(this)}
        >Update Profile
        </button>

        <span>Back to <Link href="/home" to="/home">Home</Link></span>
      </div>
    );
  }
}

export default EditProfile;
