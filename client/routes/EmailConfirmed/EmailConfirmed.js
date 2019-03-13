/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';

import logo from '../../images/BarterOutDarkLogo.png';

const EmailConfirmed = () => (
  <div className="wrapper-soft-bg">
    <div className="top-section">
      <img className="logo-nonav" src={logo} alt="logo" />
    </div>
    <div className="central-content-card">
      <MaterialIcon size={100} icon="lock_open" id="lock-icon" />
      <h2 id="header-custom">Success!</h2>
      <h3 id="forgot-password-message">
        Your email has been confirmed, you can now login.
      </h3>
      <div>
        <Link to="/login" href="login"><button type="button" className="button">Login</button></Link>
      </div>
    </div>
  </div>
);

export default EmailConfirmed;
