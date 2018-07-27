/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React from 'react';
import MaterialIcon from 'react-google-material-icons';

import logo from '../../images/BarterOutDarkLogo.png';

const SignUpSuccess = () => {
  return (
    <div className="wrapper-soft-bg">
      <div className="top-section">
        <img className="logo-nonav" src={logo} alt="logo" />
      </div>
      <div className="central-content-card">
        <MaterialIcon size={100} icon="lock_open" id="lock-icon" />
        <h2 id="header-custom">Success!</h2>
        <h3 id="forgot-password-message">
          You signed up. Before you can login, you must check your email to verify
          you account!
        </h3>
      </div>
    </div>
  );
};

export default SignUpSuccess;
