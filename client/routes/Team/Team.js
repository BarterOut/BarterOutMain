/**
 * @file React component for landing page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.4
 */

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import '../../res/sylesheetOrkneyRegular.css';
import '../../res/sylesheetOrkneyLight.css';
import '../../res/sylesheetOrkneyMedium.css';
import '../../res/sylesheetOrkneyBold.css';

import logoPic from '../../images/barterOutOrangeWhiteLogoHeader.png';

import picOne from '../../images/overtheShoulderCompressed.jpg';
import picTwo from '../../images/groupMeetingCompressed.jpg';
import picThree from '../../images/outdoorsCompressed.jpg';

import vlad from '../../images/team-photos/vladCazacu.jpg';
import annie from '../../images/team-photos/annieHamburgen.jpg';
import duncan from '../../images/team-photos/duncanGrubbs.jpg';
import daniel from '../../images/team-photos/danielMunoz.jpg';
import zino from '../../images/team-photos/zino.jpg';
import shagun from '../../images/team-photos/shagun.jpg';
import nikolai from '../../images/team-photos/Nikolai.jpg';
import genessis from '../../images/team-photos/genessisGalindo.jpg';
import zacqueline from '../../images/team-photos/zacquelineBaldwin.jpg';

import adviserOne from '../../images/team-photos/meyerElizabeth.jpg';

import logo from '../../images/barterOutProfilePhotoWebPage.png';

import linkedInLogo from '../../images/linkedIn.png';
import facebookLogo from '../../images/facebook.png';

const Team = () => (
  <div className="infowrapper">
    <div className="bar">
      <div className="left">
        <a href="/"><img className="logo" src={logoPic} alt="logo" /></a>
      </div>
    </div>
    <div className="content">
      <h1 className="text-header">Team</h1>
      <div className="header-line" />
      <div className="text-content">
        something
      </div>
    </div>
    <div className="footer">
      <div className="bottomLinksCol">
        <div className="bottomLinkHeader">Company</div>
        <a href="/team" className="bottomPageLink">Team</a>
        <br />
        <a href="/" className="bottomPageLink">Mission</a>
        <br />
        <a href="/careers" className="bottomPageLink">Careers</a>
        <br />
        <a href="/contact" className="bottomPageLink">Contact</a>
        <br />
      </div>
      <div className="bottomLinksCol">
        <div className="bottomLinkHeader">Legal</div>
        <a href="/termsOfService" className="bottomPageLink">Terms of Service</a>
        <br />
        <a href="/privacyPolicy" className="bottomPageLink">Privacy Policy</a>
      </div>
      <div className="bottomLinksCol">
        <div className="bottomLinkHeader">Developer</div>
        <a href="/" className="bottomPageLink">API Documentation</a>
        <br />
        <a href="/" className="bottomPageLink">GitHub</a>
      </div>
    </div>
    <div id="socialMedia">
      <a href="https://www.linkedin.com/company/18490388/" rel="noopener noreferrer" target="_blank">
        <img alt="logo" className="logoImage" src={linkedInLogo} />
      </a>
      <a href="https://www.facebook.com/BarterOut/" rel="noopener noreferrer" target="_blank">
        <img alt="facebook logo" className="logoImage" src={facebookLogo} />
      </a>
    </div>
    <div id="copyright">
      © 2018 BarterOut. All Rights Reserved.
    </div>
  </div>
);

export default Team;
