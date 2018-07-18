/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React from 'react';

import './careers.css';
import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';

const Careers = () => (
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
        <h3>Open Positions</h3>

        <h4 className="position-header">Frontend Web Developer</h4>
        <b><p>Role</p></b>
        <p>
          Are you passionate about frontend web development using modern frameworks and techniques? Willing to work in a fast paced,
          highly competitive environment? Do you want to work for a company
          working to make student&apos;s lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/ZfEQ36J24NcsK08Z2">this form.</a>
        </p>
        <b><p>Location</p></b>
        <p>Rochester, NY</p>
        <b><p>Required Experience</p></b>
        <p>Some experience with HTML, CSS, and Javascript.</p>

        <h4 className="position-header">Backend Web Developer</h4>
        <b><p>Role</p></b>
        <p>
          Are you passionate about server-side web development using modern frameworks and techniques? Willing to work in a fast paced,
          highly competitive environment? Do you want to work for a company
          working to make student&apos;s lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://goo.gl/forms/mZBceWIBIM4q7iSv2">this form.</a>
        </p>
        <b><p>Location</p></b>
        <p>Rochester, NY</p>
        <b><p>Required Experience</p></b>
        <p>Experience with Javascript, and JSON.</p>

        <h4 className="position-header">Web Platform Designer</h4>
        <b><p>Role</p></b>
        <p>
          Are you passionate about modern UI/UX design? Have experience using modern design tools? Do you want to work for a company
          working to make student&apos;s lives easier? If so, fill out <a rel="noopener noreferrer" target="_blank" href="https://google.com">this form.</a>
        </p>
        <b><p>Location</p></b>
        <p>Rochester, NY</p>
        <b><p>Required Experience</p></b>
        <p>Some design experience with a modern design tool, e.g. Adobe XD, Figma, Sketch, Illustrator, etc.</p>
      </div>
    </div>
  </div>
);

export default Careers;
