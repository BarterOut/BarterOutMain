/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AuthService from '../../services/AuthService';
import FetchService from '../../services/FetchService';
import ErrorService from '../../services/ErrorService';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      CMC: '',
      venmoUsername: '',
      password: '',
      passwordConfirm: '',
      newPassword: '',
      updateMessageVisible: false
    };

    this.onChange = this.onChange.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
  }

  componentDidMount() {
    this.setProfileInfo();
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleProfileUpdate(evt) {
    evt.preventDefault();

    FetchService.POST('/api/auth/updateProfile', {
      venmoUsername: this.state.venmoUsername,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      CMC: this.state.CMC,
      token: this.state.token,
    })
      .then(() => {
        this.setProfileInfo();
        sessionStorage.setItem('name', `${this.state.firstName} ${this.state.lastName}`);
        this.setState({ updateMessageVisible: true });
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
  }

  handlePasswordUpdate(evt) {
    evt.preventDefault();

    if (this.state.passwordConfirm !== this.state.newPassword) {
      window.alert('Please make your passwords the same!'); // eslint-disable-line
      return;
    }

    FetchService.POST('/api/auth/updatePassword', {
      password: this.state.password,
      newPassword: this.state.newPassword,
      token: this.state.token,
    })
      .then(() => {
        this.setState({ updateMessageVisible: true });
        setTimeout(function(){
          this.setState({ updateMessageVisible: false });
          console.log('timeout');
        }, 1000);
      })
      .catch(error => ErrorService.parseError(error));
  }

  setProfileInfo() {
    const AUTH = new AuthService();
    const token = AUTH.getToken();
    this.setState({ token });

    FetchService.GET(`/api/user/getUserData/${token}`)
      .then((data) => {
        this.setState({ firstName: data.user.firstName });
        this.setState({ lastName: data.user.lastName });
        this.setState({ CMC: data.user.CMC });
        this.setState({ venmoUsername: data.user.venmoUsername });
      });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container" >
          {
            this.state.updateMessageVisible &&
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Updated successfully!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }

          <h1 className="mb-4">Setting</h1>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                Personal Information
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                Account Information
              </a>
            </li>
          </ul>
          <div className="tab-content mt-2" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <form onSubmit={this.handleProfileUpdate}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.firstName}
                    type="text"
                    name="firstName"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.lastName}
                    type="text"
                    name="lastName"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Venmo Username</label>
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.venmoUsername}
                    type="text"
                    name="venmoUsername"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>CMC Box Number</label>
                  <input
                    className="form-control"
                    onChange={this.onChange}
                    value={this.state.CMC}
                    type="text"
                    name="CMC"
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit">Update Personal Information</button>
              </form>
            </div>

            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <form onSubmit={this.handlePasswordUpdate}>
                <div className="form-group">
                  <label>Old Password</label>
                  <input
                    className="form-control"
                    placeholder="Old Password"
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    className="form-control"
                    placeholder="New Password"
                    type="password"
                    name="newPassword"
                    onChange={this.onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    className="form-control"
                    placeholder="Confirm New Password"
                    type="password"
                    name="passwordConfirm"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Account Information</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Settings;
