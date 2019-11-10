/**
 * @file React component for users who forgot thier password.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';
import MaterialIcon from 'react-google-material-icons';

import logo from '../../images/logo-orange.png';

const SignUpSuccess = () => (
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
        You signed up. Before you can login, you must check your email to verify
        you account!
      </p>
      <div>
        <Link to="/login" href="login">
          <button type="button" className="button">Login</button>
        </Link>
      </div>
    </div>
  </div>
);

export default SignUpSuccess;
