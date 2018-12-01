/**
 * @file React component for landing page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.4
 */

import React from 'react';

import '../../res/sylesheetOrkneyRegular.css';
import '../../res/sylesheetOrkneyLight.css';
import '../../res/sylesheetOrkneyMedium.css';
import '../../res/sylesheetOrkneyBold.css';

import './Team.css';

import logoPic from '../../images/barterOutOrangeWhiteLogoHeader.png';

import stairs from '../../images/stairsCompressed.jpg';
import barteroutTeam from '../../images/barterout-team.jpg';

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
    <div className="content-about">
      <h1 className="text-header margin">About BarterOut</h1>
      <div className="header-line-margin" />
      <div className="about-content">
        <div className="landing-section" id="product">
          <div className="text-content-landing left">
            <h2 className="landing-header-title">Our Story</h2>
            <div className="header-line-landing" />
            <p className="landing-para">
              Because we care about you, we have built an easy-to-use system capable
              of providing you with the textbooks you need as fast as possible.
              In order to make this dream a reality we take a small share of every
              transaction to keep our servers running.
            </p>
          </div>
          <div className="img-content right">
            <img className="landing-img" src={barteroutTeam} alt="Team" />
          </div>
        </div>
        <div className="landing-section">
          <div className="img-content left">
            <img className="landing-img" src={stairs} alt="Group Meeting" />
          </div>
          <div className="text-content-landing right">
            <h2 className="landing-header-title">Our Mission</h2>
            <div className="header-line-landing" />
            <p className="landing-para">
              Because we care about you, we have built an easy-to-use system capable
              of providing you with the textbooks you need as fast as possible.
              In order to make this dream a reality we take a small share of every
              transaction to keep our servers running.
            </p>
          </div>
        </div>
        <h1 className="text-header margin">Meet Our Team</h1>
        <div className="header-line-margin" />
        <p className="landing-para about-team">
          Because we care about you, we have built an easy-to-use system capable
          of providing you with the textbooks you need as fast as possible.
          In order to make this dream a reality we take a small share of every
          transaction to keep our servers running.
        </p>
        <h3 className="text-header margin">Leadership</h3>
        <div className="header-line-margin" />
        <div id="team-photos">
          <div className="team-member">
            <img className="team-photo" src={vlad} alt="Vlad" />
            <h4 className="subtext">Vlad Cazacu</h4>
            <h4 className="subtext1">Co-Founder &amp; CEO</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={annie} alt="Annie" />
            <h4 className="subtext">Annie Hamburgenn</h4>
            <h4 className="subtext1">CMO</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={duncan} alt="Duncan" />
            <h4 className="subtext">Duncan Grubbs</h4>
            <h4 className="subtext1">Interim CTO</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={daniel} alt="Daniel" />
            <h4 className="subtext">Daniel Munoz</h4>
            <h4 className="subtext1">Full-Stack Developer</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>
        </div>

        <h3 className="text-header margin">Tech Team</h3>
        <div className="header-line-margin" />
        <div id="team-photos">
          <div className="team-member">
            <img className="team-photo" src={shagun} alt="Shagun" />
            <h4 className="subtext">Shagun Bose</h4>
            <h4 className="subtext1">UI/UX Designer</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={zino} alt="Zino" />
            <h4 className="subtext">Zino Hu</h4>
            <h4 className="subtext1">Full-Stack Developer</h4>
            <h4 className="subtext2">UR &apos;19</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={logo} alt="May" />
            <h4 className="subtext">May Shin Lyan</h4>
            <h4 className="subtext1">UI/UX Developer</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={logo} alt="Aman" />
            <h4 className="subtext">Aman Shrestha</h4>
            <h4 className="subtext1">Android Developer</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>
        </div>

        <h3 className="text-header margin">Marketing Team</h3>
        <div className="header-line-margin" />
        <div id="team-photos">
          <div className="team-member">
            <img className="team-photo" src={zacqueline} alt="Zacqueline" />
            <h4 className="subtext">Zacqueline Baldwin</h4>
            <h4 className="subtext1">Marketing Strategist</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={nikolai} alt="Nikolai" />
            <h4 className="subtext">Nikolai Draganov</h4>
            <h4 className="subtext1">Product Development</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={genessis} alt="Genessis" />
            <h4 className="subtext">Genessis Galindo</h4>
            <h4 className="subtext1">Marketing Analyst</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>
        </div>

        <h3 className="text-header margin">Advisors</h3>
        <div className="header-line-margin" />
        <div id="team-photos">
          <div className="team-member">
            <img className="team-photo" src={adviserOne} alt="Elizabeth" />
            <h4 className="subtext">Elizabeth Meyer</h4>
            <h4 className="subtext1">Strategy Advisor</h4>
          </div>
        </div>
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
