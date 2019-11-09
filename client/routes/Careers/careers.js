/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './careers.css';
import logo from '../../images/logo-orange.png';

import Footer from '../../components/Footer/Footer';

const Careers = () => (
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
    <div className="content">
      <h1 className="text-header">Careers</h1>
      <div className="header-line" />
      <div className="text-content">
        <b>
          <h4 className="position-header">Intro</h4>
        </b>
        <p className="careers-text">
          At BarterOut, we want to save college students money and make
          their live&apos;s easier. We have a small team of hard working devs
          that love to learn new technologies but we are always looking for
          more help. We are currently in the process of making all of our code
          open-source so it can be maintained by the college CS community at
          large. If you are interested in joining this team, checkout the list
          of technologies we use below and shoot us an email if you are interested.
        </p>
        <h4>Tech Stack (MERN):</h4>
        <h5>Core Stack:</h5>
        <ul>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>mongoDB with Mongoose</li>
          <li>React.js</li>
        </ul>

        <h5>Testing Stack:</h5>
        <ul>
          <li>Jest</li>
          <li>Supertest</li>
          <li>Enzyme</li>
        </ul>
        <h5>Misc:</h5>
        <ul>
          <li>Nodemon</li>
          <li>Babel</li>
          <li>Webpack</li>
          <li>JWT</li>
          <li>Heroku</li>
          <li>mLab (soon to be Atlas)</li>
        </ul>
      </div>
    </div>

    <Footer />
  </div>
);

export default Careers;
