/**
 * @file About.js
 * @description React component for about page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';

import '../../res/sylesheetOrkneyRegular.css';
import '../../res/sylesheetOrkneyLight.css';
import '../../res/sylesheetOrkneyMedium.css';
import '../../res/sylesheetOrkneyBold.css';

import './About.css';

import logo from '../../images/logo-orange.png';

import stairs from '../../images/stairsCompressed.jpg';
import barteroutTeam from '../../images/barterout-team.jpg';

import vlad from '../../images/team-photos/vladCazacu.jpg';
import duncan from '../../images/team-photos/duncanGrubbs.jpg';
import daniel from '../../images/team-photos/danielMunoz.jpg';
import nikolai from '../../images/team-photos/Nikolai.jpg';

import Footer from '../../components/Footer/Footer';

const About = () => (
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
    <div className="content-about">
      <h1 className="text-header margin">About BarterOut</h1>
      <div className="header-line margin" />
      <div className="about-content">
        <div className="landing-section" id="product">
          <div className="text-content-landing left">
            <h2 className="landing-header-title">Our Story</h2>
            <div className="header-line-landing" />
            <p className="landing-para">
              BarterOut was started in June 2017 by our two founders, Vlad and Pavel,
              as a reaction to the rising textbook prices and the inefficiencies in the
              second-hand markets currently used by college students. In January 2018, we
              enlarged our team with the addition of 10 new members and launched our Beta
              later that year in March. Pavel left the team in July 2018, but our organization
              is still growing, continuously launching updates and new products to
              help even more students.
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
              Our goal is to improve the college experience for everyone.
              We are a organization for students, by students.
              We believe access to educational materials is a key component
              to a great college experience and we are using technology
              to improve access for everyone. We want to leverage
              the power of collaborative, cross-disciplinary work to help fellow students.
              Our software enables universities to stay relevant in today&apos;s changing world
              and empower students to leverage technology to make their lives easier.
            </p>
          </div>
        </div>
        <h1 className="text-header margin">Meet Our Team</h1>
        <div className="header-line margin" />
        <p className="landing-para about-team">
          Currently we are a group of four creative students at the
          University of Rochester dedicated to improving the college experience
          for everyone using tech. If our mission resonates with you, be sure to
          check out our updated&nbsp;
          <a to="/careers" href="/careers">careers page</a>
          .
        </p>
        <div id="team-photos">
          <div className="team-member">
            <img className="team-photo" src={vlad} alt="Vlad" />
            <h4 className="subtext">Vlad Cazacu</h4>
            <h4 className="subtext1">Co-Founder &amp; Advisor</h4>
            <h4 className="subtext2">UR &apos;20</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={nikolai} alt="Nikolai" />
            <h4 className="subtext">Nikolai Draganov</h4>
            <h4 className="subtext1">Product Development</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={duncan} alt="Duncan" />
            <h4 className="subtext">Duncan Grubbs</h4>
            <h4 className="subtext1">Software Development</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>

          <div className="team-member">
            <img className="team-photo" src={daniel} alt="Daniel" />
            <h4 className="subtext">Daniel Munoz</h4>
            <h4 className="subtext1">Software Development</h4>
            <h4 className="subtext2">UR &apos;21</h4>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default About;
