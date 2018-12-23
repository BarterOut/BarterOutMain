/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './careers.css';
import logoPic from '../../images/barterOutOrangeWhiteLogoHeader.png';

import Footer from '../../components/Footer/Footer';

const Careers = () => (
  <div className="infowrapper">
    <nav className="headerBar">
      <div className="logo">
        <a href="/" className="buttonLink"><img alt="logo" className="logoPic" src={logoPic} /></a>
      </div>
      <div className="pageLinks">
        <Link className="landingPageLink" to="/" href="/">Home</Link>
        <Link className="landingPageLink" to="/about" href="/about">About</Link>
        <Link className="landingPageLink" to="/login" href="/login">Login</Link>
        <Link className="landingPageLink" to="/signup" href="/signup">Sign Up</Link>
      </div>
    </nav>
    <div className="content">
      <h1 className="text-header">Careers</h1>
      <div className="header-line" />
      <div className="text-content">
        <b>
          <h4 className="position-header">Intro</h4>
        </b>
        <p className="careers-text">
          At BarterOut, we have a <em>very</em> small team of seven, highly motivated developers,
          working at a fast pace. We work hard to create an inclusive, yet realistic environment
          that pushes all of us to become better team members and developers. We make learning a
          priority, which allows us to open our doors to a much wider range of people. This being
          said, BarterOut is still a <em>very young</em> company and we do not have many of
          the resources larger companies do.
          <b><p className="careers-text">Note:</p></b>
          <ul>
            <li>We do not pay employees at the moment.</li>
            <li>You must be very self motivated, there is little management overhead.</li>
            <li>You have to be ready to <b>learn</b> if you are not familiar with our tech stack.</li>
          </ul>
        </p>
        <h3>Open Positions</h3>
        <h4 className="position-header">Frontend Web Developer</h4>
        <b>
          <p className="careers-text">Role</p>
        </b>
        <p className="careers-text">
          Are you passionate about frontend web development using modern frameworks and techniques? Willing to work in a fast paced, agile environment? Do you want to work for a startup whose aim is to make students&apos; lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/ZfEQ36J24NcsK08Z2">this form.</a>
        </p>
        <b>
          <p className="careers-text">Location</p>
        </b>
        <p className="careers-text">Rochester, NY</p>
        <b>
          <p className="careers-text">Duties &amp; Responsibilities</p>
        </b>
        <div className="careers-text">
          <ol>
            <li>Write performing Javascript code in a team setting.</li>
            <li>Write and execute unit tests with NYC and Jest.</li>
            <li>Design and implement smart, modular React components.</li>
            <li>Work with web protocols (HTTP, SLL) to utilize our API.</li>
          </ol>
        </div>
        <b>
          <p className="careers-text">Required Experience</p>
        </b>
        <p className="careers-text">Experience with HTML, CSS, and Javascript.<br />
          Understanding of SEO preferred.
          Familiar with Git and Github (Branching, Pull Requests, Code Review).
        </p>
        <h4 className="position-header">Backend Web Developer</h4>
        <b>
          <p className="careers-text">Role</p>
        </b>
        <p className="careers-text">
          Are you passionate about server-side web development using modern frameworks and techniques? Willing to work in a fast paced, agile environment? Do you want to work for a startup whose aim is to make students&apos; lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/mZBceWIBIM4q7iSv2">this form.</a>
        </p>
        <b>
          <p className="careers-text">Location</p>
        </b>
        <p className="careers-text">Rochester, NY</p>
        <b>
          <p className="careers-text">Duties &amp; Responsibilities</p>
        </b>
        <div className="careers-text">
          <ol>
            <li>Write performing Javascript code in a team setting.</li>
            <li>Write and execute unit tests with NYC and Jest.</li>
            <li>Design and implement mongoose schemas.</li>
            <li>Implement new, well documented API functionality.</li>
          </ol>
        </div>
        <b>
          <p className="careers-text">Required Experience</p>
        </b>
        <p className="careers-text">Experience with Javascript, Express.js, and JSON.<br />
           Familiar with Git and Github (Branching, Pull Requests, Code Review).
        </p>
        <h4 className="position-header">iOS Developer</h4>
        <b>
          <p className="careers-text">Role</p>
        </b>
        <p className="careers-text">
          Are you passionate about and have experience with mobile development on iOS? Willing to work in a fast paced, agile environment? Do you want to work for a startup whose aim is to make students&apos; lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/xgxmPJFRerqP2kdd2">this form.</a>
        </p>
        <b>
          <p className="careers-text">Location</p>
        </b>
        <p className="careers-text">Rochester, NY</p>
        <b>
          <p className="careers-text">Duties &amp; Responsibilities</p>
        </b>
        <div className="careers-text">
          <ol>
            <li>Use modern techniques to build interactive UIs from design a spec.</li>
            <li>Manage deploying and updating an iOS app.</li>
            <li>Work with web protocols (HTTP, SLL) to utilize our API.</li>
          </ol>
        </div>
        <b>
          <p className="careers-text">Required Experience</p>
        </b>
        <p className="careers-text">Experience with Xcode, Swift and Apple’s App Store Review Guidelines.<br />
          Experience with Apple’s API capabilities (Touch ID, Photos, etc.) preferred.<br />
          Understanding of modern app design preferred.
        </p>

        <h4 className="position-header">Android Developer</h4>
        <b>
          <p className="careers-text">Role</p>
        </b>
        <p className="careers-text">
          Are you passionate about and have experience with mobile development on Android? Willing to work in a fast paced, agile environment? Do you want to work for a startup whose aim is to make students&apos; lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/Jxyci6YMknB2r9QA3">this form.</a>
        </p>
        <b>
          <p className="careers-text">Location</p>
        </b>
        <p className="careers-text">Rochester, NY</p>
        <b>
          <p className="careers-text">Duties &amp; Responsibilities</p>
        </b>
        <div className="careers-text">
          <ol>
            <li>Use modern techniques to build interactive UIs from a design spec.</li>
            <li>Manage deploying and updating an Android app.</li>
            <li>Work with web protocols (HTTP, SLL) to utilize our API.</li>
          </ol>
        </div>
        <b>
          <p className="careers-text">Required Experience</p>
        </b>
        <p className="careers-text">Experience with Android Studio, Java (or Kotlin) and Googles&apos; Play Store Review Guidelines.<br />
          Experience with Google&apos; API capabilities preferred.<br />
          Understanding of modern app design preferred.
        </p>
      </div>
    </div>

    <Footer />
  </div>
);

export default Careers;
