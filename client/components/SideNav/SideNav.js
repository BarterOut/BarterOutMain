/**
 * @file Reusable React component for the side nav of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import '../../baseStyles.css';

import './SideNav.css';

import profile from '../../images/barterOutProfilePhotoWebPage.png';
import logo from '../../images/white Logo.png';
import home from '../../res/icons/baseline_home_white_18dp.png';

class SideNav extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    const selectedNavItem = document.getElementsByName(this.props.selected)[0];
    selectedNavItem.className = 'nav-link selected';

    this._getProfileInfo();
  }

  _getProfileInfo() {
    if (!sessionStorage.getItem('name')) {
      const AUTH = new AuthService();
      FetchService.GET(`/api/auth/getUserData/${AUTH.getToken()}`)
        .then(response => response.json())
        .then((data) => {
          sessionStorage.setItem('name', `${data.user.firstName} ${data.user.lastName}`);
          this.setState({ name: `${data.user.firstName} ${data.user.lastName}` });
        });
    } else {
      this.setState({ name: sessionStorage.getItem('name') });
    }
  }

  render() {
    return (
      <div id="wrapper">
        <div className="top-of-nav">
          <img id="logo" src={logo} alt="logo" />
          <div id="three-bar" />
        </div>
        <div id="profile-wrapper">
          <img src={profile} alt="profile" id="profile-pic" />
          <div id="name">
            {this.state.name}
          </div>
        </div>
        <div id="link-wrapper">
          <Link className="nav-link" name="home" to="/home" href="/home">
            {/* <img id="nav-icon" src={home} alt="home" /> */}
            Home
          </Link>
          <Link className="nav-link" name="buy" to="/buy" href="/buy">Buy</Link>
          <Link className="nav-link" name="sell" to="/sell" href="/sell">Sell</Link>
          <Link className="nav-link" name="track" to="/track" href="/track">Track</Link>
          <Link className="nav-link" name="settings" to="/settings" href="/settings">Settings</Link>
          <Link className="nav-link" name="help" to="/help" href="/help">Help</Link>
        </div>
        <span id="copyright-footer">Copyright 2018 BarterOut</span>
      </div>
    );
  }
}

SideNav.propTypes = {
  selected: propTypes.string.isRequired,
};

export default SideNav;
