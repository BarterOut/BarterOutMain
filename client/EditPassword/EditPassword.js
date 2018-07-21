
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

import './EditPassword.css';
import '../baseStyles.css';


import SideNav from '../components/SideNav/SideNav';
import TopBar from '../components/TopBar/TopBar';


import FetchService from '../services/FetchService';

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
    if (!(this.state.passwordConfirm === this.state.newPassword)) {
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

    return (

      <div className="app-wrapper">
        <SideNav
          selected="settings"
        />

        <div className="right-content">
          <TopBar />
          <div className="dividePage">
            <div className="columns-Password">
              <a href="/settings"><button className="button" id="Account">Account</button></a>


              <a href="/EditPassword"><button className="button" id="EditPassword">Password</button></a>

            </div>
            <div className="page-content-Password">
              <div className="title--page-section-wrapper-Password">
                <h2 className="title-text--page-section-header">Password</h2>
              </div>
              <div className="page-section-wrapper-Password" >
                <div className="insideInfo-Password">
                  <input
                    className="input"
                    placeholder="Password"
                    type="password"
                    name="password"
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
                  <input
                    className="input"
                    placeholder="Confirm Password"
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

export default EditPassword;
