/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

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
      .then(response => response.json())
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
      <div className="app-wrapper">
        <SideNav
          selected="settings"
        />

        <div className="right-content">
          <TopBar page="Profile Settings" />
          <div className="dividePage">
            <div className="columns">
              <Link className="nav-link-settings selected-settings-nav" name="settings" to="/settings" href="/settings">
                Account
              </Link>
              <Link className="nav-link-settings" name="editPassword" to="/editPassword" href="/editPassword">
                Security
              </Link>
            </div>
            <div className="page-content">
              <div className="title--page-section-wrapper-settings">
                <h2 className="title-text--page-section-header">Account</h2>
              </div>
              <div className="page-section-wrapper-settings" >
                <div className="insideInfo">
                  {
                    this.state.updateMessageVisible &&
                    <h3>You succesfully updated your information.</h3>
                  }
                  <span className="inputLabelHome">First Name</span>
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.firstName}
                    type="text"
                    name="firstName"
                    required
                  />
                  <span className="inputLabelHome">Last Name</span>
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.lastName}
                    type="text"
                    name="lastName"
                    required
                  />
                  <span className="inputLabelHome">Venmo Username</span>
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.venmoUsername}
                    type="text"
                    name="venmoUsername"
                    required
                  />
                  <span className="inputLabelHome">CMC Box Number</span>
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.CMC}
                    type="text"
                    name="CMC"
                    required
                  />
                </div>
                <div className="insideInfo">
                  <button
                    className="button"
                    type="submit"
                    onClick={this.updateProfile.bind(this)}
                  >Update Information
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Settings;
