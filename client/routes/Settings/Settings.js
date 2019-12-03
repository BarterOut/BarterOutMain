/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Zino Hu
 * @version 0.0.4
 */

import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // eslint-disable-line

import NavBar from '../../components/NavBar/NavBar';

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
      updateMessageVisible: false,
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

  setProfileInfo() {
    const token = AuthService.getToken();
    this.setState({ token });

    FetchService.GET('/api/user/getUserData')
      .then((data) => {
        this.setState({ firstName: data.user.firstName });
        this.setState({ lastName: data.user.lastName });
        this.setState({ CMC: data.user.CMC });
        this.setState({ venmoUsername: data.user.venmoUsername });
      });
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
        localStorage.setItem('name', `${this.state.firstName} ${this.state.lastName}`);
        this.setState({ updateMessageVisible: true });
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line
        ErrorService.parseError(error);
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
      })
      .catch(error => ErrorService.parseError(error));
  }

  render() {
    return (
      <div>
        <NavBar page="settings" />
        <div className="container">
          {
            this.state.updateMessageVisible
            && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Updated successfully!
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            )
          }
          <h3 className="mb-4">Settings</h3>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="true"
              >Personal Information
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="password-tab"
                data-toggle="tab"
                href="#password"
                role="tab"
                aria-controls="password"
                aria-selected="false"
              >Account Information
              </a>
            </li>
          </ul>
          <div className="tab-content mt-2" id="myTabContent">
            <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <form onSubmit={this.handleProfileUpdate}>
                <div className="form-group">
                  <label htmlFor="firstName">
                    First Name
                    <input
                      id="firstName"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.firstName}
                      type="text"
                      name="firstName"
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Last Name
                    <input
                      id="lastName"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.lastName}
                      type="text"
                      name="lastName"
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="venmo">
                    Venmo Username
                    <input
                      id="venmo"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.venmoUsername}
                      type="text"
                      name="venmoUsername"
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="cmc">
                    CMC Box Number
                    <input
                      id="cmc"
                      className="form-control"
                      onChange={this.onChange}
                      value={this.state.CMC}
                      type="text"
                      name="CMC"
                      required
                    />
                  </label>
                </div>
                <button className="btn btn-primary" type="submit">Update Personal Information</button>
              </form>
            </div>

            <div className="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
              <form onSubmit={this.handlePasswordUpdate}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password
                    <input
                      id="oldPassword"
                      className="form-control"
                      placeholder="Old Password"
                      type="password"
                      name="password"
                      onChange={this.onChange}
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">
                    New Password
                    <input
                      id="newPassword"
                      className="form-control"
                      placeholder="New Password"
                      type="password"
                      name="newPassword"
                      onChange={this.onChange}
                      required
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm New Password
                    <input
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm New Password"
                      type="password"
                      name="passwordConfirm"
                      onChange={this.onChange}
                      required
                    />
                  </label>
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
