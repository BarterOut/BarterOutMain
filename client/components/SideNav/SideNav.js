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
import logo from '../../images/white Logo@2x.png';
import MaterialIcon from 'react-google-material-icons';

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
      FetchService.GET(`/api/user/getUserData/${AUTH.getToken()}`)
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
          <Link id="logo-link" to="/home" href="/home">
            <img id="logo" src={logo} alt="logo" />
          </Link>
          <div id="three-bar">
            <MaterialIcon icon="menu" size={36} />
          </div>
        </div>
        <div id="profile-wrapper">
          <img src={profile} alt="profile" id="profile-pic" />
          <div id="name">
            {this.state.name}
          </div>
        </div>
        <div id="link-wrapper">
          <Link className="nav-link" name="home" to="/home" href="/home">
            <div className="nav-icon"><MaterialIcon icon="home" size={36} /></div>
            Home
          </Link>
          <Link className="nav-link" name="buy" to="/buy" href="/buy">
            <div className="nav-icon"><MaterialIcon icon="shopping_cart" size={36} /></div>
            Buy
          </Link>
          <Link className="nav-link" name="sell" to="/sell" href="/sell">
            <div className="nav-icon"><MaterialIcon icon="store" size={36} /></div>
            Sell
          </Link>
          <Link className="nav-link" name="track" to="/track" href="/track">
            <div className="nav-icon"><MaterialIcon icon="timeline" size={36} /></div>
            Track
          </Link>
          <Link className="nav-link" name="settings" to="/settings" href="/settings">
            <div className="nav-icon"><MaterialIcon icon="settings" size={36} /></div>
            Settings
          </Link>
          <Link className="nav-link" name="help" to="/help" href="/help">
            <div className="nav-icon"><MaterialIcon icon="help" size={36} /></div>
            Help
          </Link>
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
