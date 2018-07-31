/**
 * @file React component for the contact route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React from 'react';

import logoPic from '../../images/barterOutOrangeWhiteLogoHeader.png';

const Contact = () => (
  <div className="infowrapper">
    <div className="bar">
      <div className="left">
        <a href="/"><img className="logo" src={logoPic} alt="logo" /></a>
      </div>
    </div>
    <div className="content">
      <h1 className="text-header">Contact</h1>
      <div className="header-line" />
      <div className="text-content">
        <h3>You can reach us by:</h3>

        <ul>
          <li>Email: office@barterout.com</li>
          <li><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/BarterOut/">Facebook</a></li>
          <li><a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/company/18490388/">LinkedIn</a></li>
        </ul>

        <h3>or by filling out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">this</a> form.</h3>
      </div>
    </div>
  </div>
);

export default Contact;
