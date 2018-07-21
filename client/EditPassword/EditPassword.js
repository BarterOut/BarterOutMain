
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../services/AuthService';
import FetchService from '../services/FetchService';

import './EditPassword.css';
import '../baseStyles.css';

import SideNav from '../components/SideNav/SideNav';
import TopBar from '../components/TopBar/TopBar';

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConfirm: '',
      newPassword: '',
    };
  }

  componentDidMount() {
    const auth = new AuthService();
    const token = auth.getToken();
    this._setToken(token);

    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  _setToken(token) {
    this.setState({ token });
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.signUp();
    }
  }

  updatePassword() {
    if (!(this.state.passwordConfirm === this.state.newPassword)) {
      window.alert('Please make your passwords the same!');
      return;
    }
    FetchService.POST('/api/auth/updatePassword', {
      password: this.state.password,
      newPassword: this.state.newPassword,
      token: this.state.token,
    })
      .then(() => {
        console.log('Success');
      })
      .catch((error) => {
        console.error(`Server error: ${error}`);
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
              <Link className="nav-link-settings" name="settings" to="/settings" href="/settings">
                Account
              </Link>
              <Link className="nav-link-settings selected-settings-nav" name="editPassword" to="/editPassword" href="/editPassword">
                Security
              </Link>
            </div>
            <div className="page-content">
              <div className="title--page-section-wrapper-settings">
                <h2 className="title-text--page-section-header">
                  Reset Password
                </h2>
              </div>
              <div className="page-section-wrapper-settings">
                <div className="insideInfo">
                  <input
                    className="formInput"
                    placeholder="Old Password"
                    type="password"
                    name="password"
                    onChange={this.onChange.bind(this)}
                    required
                  />
                  <input
                    className="formInput"
                    placeholder="New Password"
                    type="password"
                    name="newPassword"
                    onChange={this.onChange.bind(this)}
                    required
                  />
                  <input
                    className="formInput"
                    placeholder="Confirm New Password"
                    type="password"
                    name="passwordConfirm"
                    onChange={this.onChange.bind(this)}
                    required
                  />
                </div>
                <div className="insideInfo">
                  <button
                    className="button"
                    type="submit"
                    onClick={this.updatePassword.bind(this)}
                  >Update
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

export default EditPassword;
