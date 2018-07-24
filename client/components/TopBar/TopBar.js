/**
 * @file Reusable React component for the top bar of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component, Link } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import FetchService from '../../services/FetchService';

import '../../baseStyles.css';

import './TopBar.css';

class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      school: String,
    };
  }

  componentDidMount() {
    const Auth = new AuthService();
    if (Auth.getToken() === null) {
      this._updateRedirect(true);
    }

    FetchService.GET(`/api/user/getUserData/${Auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this._updateSchool(data.user.university);
      });
  }

  _updateSchool(value) {
    this.setState({ school: value });
  }

  _updateRedirect(value) {
    this.setState({ redirect: value });
  }

  _logout() {
    const Auth = new AuthService();
    Auth.logout();
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />);
    }

    return (
      <div id="bar-wrapper">
        <div className="left-bar part">
          <a href="/cart"><button className="button" id="cart">Cart</button></a>
        </div>
        <div className="middle-bar part">
          <h4><b>{this.state.school}</b></h4>
        </div>
        <div className="right-bar part">
          <button className="button" onClick={this._logout.bind(this)}>Logout</button>
        </div>
      </div>
    );
  }
}

export default TopBar;
