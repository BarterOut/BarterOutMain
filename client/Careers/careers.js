/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React from 'react';

import './careers.css';
import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';

const Careers = () => {
  return (
    <div className="infowrapper">
      <div className="bar">
        <div className="right">
          <a href="/"><img className="logo" src={logoPic} alt="logo" /></a>
        </div>
      </div>
      <div className="content">
        <h1 className="text-header">Careers</h1>
        <div className="header-line" />
        <div className="text-content">
          <p>We are not currently looking for new hires.</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
