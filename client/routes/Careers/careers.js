/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React from 'react';

import './careers.css';
import logoPic from '../../images/barterOutOrangeWhiteLogoHeader.png';

const Careers = () => (
  <div className="infowrapper">
    <div className="bar">
      <div className="left">
        <a href="/"><img className="logo" src={logoPic} alt="logo" /></a>
      </div>
    </div>
    <div className="content">
      <h1 className="text-header">Careers</h1>
      <div className="header-line" />
      <div className="text-content">
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
            <li>Write performent Javascript code in a team setting.</li>
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
            <li>Write performent Javascript code in a team setting.</li>
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
        <h4 className="position-header">UI/UX Designer</h4>
        <b>
          <p className="careers-text">Role</p>
        </b>
        <p className="careers-text">
          Are you passionate about modern UI/UX design and have experience using design tools? Do you want to work for a startup whose aim is to make students&apos; lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/TmJZPoOI2Y8EIVAs2">this form.</a>
        </p>
        <b>
          <p className="careers-text">Location</p>
        </b>
        <p className="careers-text">Rochester, NY</p>
        <b>
          <p className="careers-text">Duties &amp; Responsibilities</p>
        </b>
        <p className="careers-text">Design the client and admin end of our website in both desktop and mobile versions. <br />
          Design the mobile applications for our services. <br />
          Communicate with the developer team to br /ing the designs to life.
        </p>
        <b>
          <p className="careers-text">Required Experience</p>
        </b>
        <p className="careers-text">Some design experience with a modern design tool such as Adobe XD, Figma, Sketch, Illustrator or similar. <br />
          Knowledge of SEO, HTML and CSS preferred.
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

    <div className="landingPageBottom">
      <div id="bottomLinksCol1">
        <div className="bottomLinkHeader">Company</div>
        <a href="/careers" className="bottomPageLink">Careers</a>
        <br />
        <a href="/contact" className="bottomPageLink">Contact</a>
        <br />
      </div>
      <div id="bottomLinksCol2">
        <div className="bottomLinkHeader">Resources</div>
        <a href="/termsOfService" className="bottomPageLink">Terms of Service</a>
        <br />
        <a href="/privacyPolicy" className="bottomPageLink">Privacy Policy</a>
      </div>
    </div>
    <div id="copyright">
      © 2018 BarterOut. All Rights Reserved.
    </div>
  </div>
);

export default Careers;
