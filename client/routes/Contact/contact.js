/**
 * @file React component for the contact route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo-orange.png';

const Contact = () => (
  <div className="infowrapper">
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
    <div className="content">
      <h1 className="text-header">Contact</h1>
      <div className="header-line" />
      <div className="text-content">
        <h3>You can reach us by:</h3>

        <ul>
          <li>Email: development@barterout.com</li>
          <li><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/BarterOut/">Facebook</a></li>
          <li><a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/company/18490388/">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  </div>
);

export default Contact;
