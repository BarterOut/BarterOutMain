/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';

import './Settings.css';

import AuthService from '../../services/AuthService';
import FetchService from '../../services/FetchService';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      CMC: '',
      venmoUsername: '',
      updateMessageVisible: false,
    };

    this.onChange = this.onChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  getProfileInfo() {
    const AUTH = new AuthService();
    const token = AUTH.getToken();
    this._setToken(token);

    document.addEventListener('keydown', this._handleKeyDown.bind(this));

    FetchService.GET(`/api/user/getUserData/${AUTH.getToken()}`)
      .then((data) => {
        this.setState({ firstName: data.user.firstName });
        this.setState({ lastName: data.user.lastName });
        this.setState({ CMC: data.user.CMC });
        this.setState({ venmoUsername: data.user.venmoUsername });
      });
  }

  _setToken(token) {
    this.setState({ token });
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.updateProfile();
    }
  }

  updateProfile() {
    FetchService.POST('/api/auth/updateProfile', {
      venmoUsername: this.state.venmoUsername,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      CMC: this.state.CMC,
      token: this.state.token,
    })
      .then(() => {
        this.getProfileInfo();
        sessionStorage.setItem('name', `${this.state.firstName} ${this.state.lastName}`);
        this.setState({ updateMessageVisible: true });
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default Settings;
