/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import AuthService from '../services/AuthService';
import FetchService from '../services/FetchService';

import './Home.css';
import TopBar from '../components/TopBar/TopBar';
import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';
import profile from '../images/barterOutProfilePhotoWebPage.png';

import BookPost from '../components/BookPost/BookPost';
import BuyBook from '../components/BuyBook/BuyBook';
import SellBook from '../components/SellBook/SellBook';
import SideNav from '../components/SideNav/SideNav';

const Home = () => (
  <div className="app-wrapper">
    <SideNav
      selected="home"
    />

    <div className="right-content">
      <TopBar />
      <h1>Home</h1>
    </div>
  </div>
);

export default Home;
