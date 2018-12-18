/**
 * @file Footer.js
 * @description Footer for the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';

import linkedInLogo from '../../images/linkedIn.png';
import facebookLogo from '../../images/facebook.png';

import '../../barterout.css';

const Footer = () => (
  <div>
    <div className="footer">
      <div className="bottomLinksCol">
        <div className="bottomLinkHeader">Company</div>
        <a to="/about" href="/about" className="bottomPageLink">About</a>
        <br />
        <a to="/careers" href="/careers" className="bottomPageLink">Careers</a>
        <br />
        <a to="/contact" href="/contact" className="bottomPageLink">Contact</a>
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
        <a href="https://github.com/BarterOut/api-docs" className="bottomPageLink">API Documentation</a>
        <br />
        <a href="https://github.com/BarterOut/" className="bottomPageLink">GitHub</a>
      </div>

      <div className="bottomLinksCol-right">
        <div className="addressLine">260 East Main Street</div>
        <div className="addressLine">Suite 6325</div>
        <div className="addressLine">Rochester, NY 14604</div>
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

export default Footer;
