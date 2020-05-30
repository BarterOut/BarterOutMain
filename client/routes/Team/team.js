/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './team.css';
import logo from '../../images/logo-orange.png';

import Footer from '../../components/Footer/Footer';

const Team = () => (
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
      <h1 className="text-header">Team</h1>
      <div className="header-line" />
      <div className="text-content">
        <b>
          <h4 className="position-header">Hey there!</h4>
        </b>
        <p className="careers-text">
          At BarterOut, we want to save college students money and make
          their lives easier. We have a small team of hard working devs
          that love to learn new technologies but we are always looking for
          more help.
          If you are interested in joining this team, checkout the list
          of technologies we use below and shoot us an&nbsp;
          <a href="mailto:development@barterout.com">email</a>
          &nbsp;if you are interested. While there are no requirements
          to contribute, if you are interesting in becoming a core maintainer,
          we recommend having at least a basic understanding of the following technologies:
        </p>
        <h4>
          Tech Stack&nbsp;
          <i>(MERN)</i>
          :
        </h4>
        <h5>Core Stack:</h5>
        <ul>
          <li>MongoDB with Mongoose</li>
          <li>Express.js</li>
          <li>React.js</li>
          <li>Node.js</li>
        </ul>

        <h5>Testing Stack:</h5>
        <ul>
          <li>Jest</li>
          <li>Supertest</li>
          <li>Enzyme</li>
        </ul>
        <h5>Other Tech:</h5>
        <ul>
          <li>Nodemon</li>
          <li>Docker</li>
          <li>Babel</li>
          <li>Bootstrap</li>
          <li>Webpack</li>
          <li>JWT</li>
          <li>Heroku</li>
          <li>TravisCI</li>
          <li>Code Climate</li>
          <li>MongoDB Atlas</li>
        </ul>
      </div>
    </div>

    <Footer />
  </div>
);

export default Team;
