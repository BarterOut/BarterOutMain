/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

import './Settings.css'
import axios from "axios/index";

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
      redirect: false,
    };
  }

  componentDidMount() {
    const AUTH = new AuthService();
    const token = AUTH.getToken();
    this.setState({ token: token });
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
    FetchService.GET(`/api/auth/getUserData/${AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ firstName: `${data.user.firstName}`});
        this.setState({ lastName: `${data.user.lastName}`});
        this.setState({ CMC: `${data.user.CMC}`});
        this.setState({ venmoUsername: `${data.user.venmoUsername}`});
      });
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
    return (
      <div className="app-wrapper">
        <SideNav
          selected="settings"
        />

        <div className="right-content">
          <TopBar />
          <div className="dividePage">
            <div className="columns">
              <a href="/settings"><button className="button" id="Account">Account</button></a>


              <a href="/EditPassword"><button className="button" id="EditPassword">Password</button></a>

            </div>
            <div className="page-content-settings">
              <div className="title--page-section-wrapper-Settings">
                <h2 className="title-text--page-section-header">Settings</h2>
              </div>
              <div className="page-section-wrapper-Settings" >
                <div className="insideInfo">
                  <input
                    className="input"
                    onChange={this.onChange.bind(this)}
                    placeholder= {this.state.firstName}
                    type="text"
                    name="firstName"
                    required
                  />
                  <input
                    className="input"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.lastName}
                    type="text"
                    name="lastName"
                    required
                  />
                </div>
                <div className="insideInfo">
                  <input
                    className="input"
                    onChange={this.onChange.bind(this)}
                    placeholder={this.state.venmoUsername}
                    type="text"
                    name="venmoUsername"
                    required
                  />
                  <input
                    className="input"
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
