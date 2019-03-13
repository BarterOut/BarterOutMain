/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';

import logo from '../../images/barterOutOrangeWhiteLogoHeader.png';

const ForgotPasswordSuccess = () => (
  <div className="forgot-password">
    <nav className="headerBar">
      <div className="logo">
        <a href="/" className="buttonLink"><img alt="logo" className="logo" src={logo} /></a>
      </div>
      <div className="pageLinks">
        <Link className="landingPageLink" to="/" href="/">Home</Link>
        <Link className="landingPageLink" to="/about" href="/about">About</Link>
        <Link className="landingPageLink" to="/login" href="/login">Login</Link>
        <Link className="landingPageLink" to="/signup" href="/signup">Sign Up</Link>
      </div>
    </nav>
    <div className="forgot-password__content">
      <MaterialIcon size={100} icon="lock_open" id="lock-icon" />
      <h3 id="header-custom">Success!</h3>
      <p id="forgot-password-message">
      A password reset email is waiting in your
      inbox. Follow the instructions in it to
      create a new pasword.
      </p>
      <div>
        <Link to="/login" href="login">
          <button type="button" className="button">Login</button>
        </Link>
      </div>
    </div>
  </div>
);

export default ForgotPasswordSuccess;
