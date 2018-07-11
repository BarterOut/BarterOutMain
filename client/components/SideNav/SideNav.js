/**
 * @file Reusable React component for the side nav of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../baseStyles.css';

import './SideNav.css';

import profile from '../../images/barterOutProfilePhotoWebPage.png';
import logo from '../../images/barterOutOrangeWhiteLogo.png';

class SideNav extends Component {
  componentDidMount() {
    const selectedNavItem = document.getElementsByName(this.props.selected)[0];
    selectedNavItem.className = 'nav-link selected';
  }

  render() {
    return (
      <div id="wrapper">
        <img id="logo" src={logo} alt="logo" />
        <div id="profile-wrapper">
          <img src={profile} alt="profile" id="profile-pic" />
          <div id="name">
            Duncan Grubbs
          </div>
        </div>
        <div id="link-wrapper">
          <Link className="nav-link" name="home" to="/home" href="/home">
            Home
          </Link>
          <Link className="nav-link" name="buy" to="/buy" href="/buy">Buy</Link>
          <Link className="nav-link" name="sell" to="/sell" href="/sell">Sell</Link>
          <Link className="nav-link" name="track" to="/track" href="/track">Track</Link>
          <Link className="nav-link" name="settings" to="/settings" href="/settings">Settings</Link>
          <Link className="nav-link" name="help" to="/help" href="/help">Help</Link>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  selected: propTypes.string.isRequired,
};

export default SideNav;
