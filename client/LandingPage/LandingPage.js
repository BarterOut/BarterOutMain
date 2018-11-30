/**
 * @file React component for landing page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.4
 */

import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import AuthService from '../services/AuthService';

import './landingpage.css';
import '../res/sylesheetOrkneyRegular.css';
import '../res/sylesheetOrkneyLight.css';
import '../res/sylesheetOrkneyMedium.css';
import '../res/sylesheetOrkneyBold.css';

import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';

import picOne from '../images/overtheShoulderCompressed.jpg';
import picTwo from '../images/groupMeetingCompressed.jpg';
import picThree from '../images/outdoorsCompressed.jpg';

import linkedInLogo from '../images/linkedIn.png';
import facebookLogo from '../images/facebook.png';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.setRedirect();
  }

  setRedirect() {
    if (!this.Auth.isTokenExpired(this.Auth.getToken())) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/home" />);
    }

    return (
      <div className="app">
        <div className="landingpage">
          <div className="photo-bg">
            <nav className="headerBar animated slideInDown">
              <div className="logo">
                <a href="/" className="buttonLink"><img alt="logo" id="logoPic" src={logoPic} /></a>
              </div>
              <div className="pageLinks">
                <a className="productLink landingPageLink" href="/">Home</a>
                <a className="missionLink landingPageLink" href="#product">Our Product</a>
                <a className="teamLink landingPageLink" href="/team">About</a>
                <Link className="landingPageLink preRegisterLink" to="/login" href="/login">Login</Link>
                <Link className="landingPageLink preRegisterLink" to="/signup" href="/signup">Sign Up</Link>
              </div>
            </nav>
            <div className="mainText animated fadeIn" id="mainText">
              <h1>
                YOUR TEXTBOOKS <br />
                HASSLE-FREE
              </h1>
              <div id="search-wrapper" />
            </div>
          </div>
          <div className="landing-section" id="product">
            <div className="text-content-landing left">
              <h2 className="landing-header-title">Our Product</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
                Because we care about you, we have built an easy-to-use system capable
                of providing you with the textbooks you need as fast as possible.
                In order to make this dream a reality we take a small share of every
                transaction to keep our servers running.
              </p>
            </div>
            <div className="img-content right">
              <img className="landing-img" src={picTwo} alt="Group Meeting" />
            </div>
          </div>
          <div className="landing-section purple">
            <div className="img-content left">
              <img className="landing-img" src={picThree} alt="Group Meeting" />
            </div>
            <div className="text-content-landing right">
              <h2 className="landing-header-title">For Students</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
                Because we care about you, we have built an easy-to-use system capable
                of providing you with the textbooks you need as fast as possible.
                In order to make this dream a reality we take a small share of every
                transaction to keep our servers running.
              </p>
            </div>
          </div>
          <div className="landing-section">
            <div className="text-content-landing left">
              <h2 className="landing-header-title">For Universities</h2>
              <div className="header-line-landing" />
              <p className="landing-para">
                Because we care about you, we have built an easy-to-use system capable
                of providing you with the textbooks you need as fast as possible.
                In order to make this dream a reality we take a small share of every
                transaction to keep our servers running.
              </p>
            </div>
            <div className="img-content right">
              <img className="landing-img" src={picOne} alt="Group Meeting" />
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
      </div>
    );
  }
}

export default LandingPage;

