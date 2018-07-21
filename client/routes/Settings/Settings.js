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
    };
  }

  componentDidMount() {
    const AUTH = new AuthService();
    const token = AUTH.getToken();
    this._setToken(token);

    document.addEventListener('keydown', this._handleKeyDown.bind(this));

    FetchService.GET(`/api/auth/getUserData/${AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ firstName: data.user.firstName });
        this.setState({ lastName: data.user.lastName });
        this.setState({ CMC: data.user.CMC });
        this.setState({ venmoUsername: data.user.venmoUsername });
      });
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
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
        console.log('You have updated your information');
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
          <TopBar />
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
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.firstName}
                    type="text"
                    name="firstName"
                    required
                  />
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.lastName}
                    type="text"
                    name="lastName"
                    required
                  />
                  <input
                    className="formInput"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.venmoUsername}
                    type="text"
                    name="venmoUsername"
                    required
                  />
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
                  >Save
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
