/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';

import logo from '../../images/BarterOutDarkLogo.png';

class ForgotPasswordSuccess extends Component {
  render() {
    return (
      <div className="wrapper-soft-bg">
        <div className="top-section">
          <img className="logo-nonav" src={logo} alt="logo" />
        </div>
        <div className="central-content-card">
          <MaterialIcon size={100} icon="lock_open" id="lock-icon" />
          <h2 id="header-custom">Success!</h2>
          <h3 id="forgot-password-message">
          A password reset email is waiting in your
          inbox. Follow the instructions in it to
          create a new pasword.
          </h3>
          <div>
            <Link to="/login" href="login"><button className="button">Login</button></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordSuccess;
