/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import './Home.css';
import TopBar from '../components/TopBar/TopBar';
import SideNav from '../components/SideNav/SideNav';

const Home = () => (
  <div className="app-wrapper">
    <SideNav
      selected="home"
    />

    <div className="right-content">
      <TopBar />
      <div className="page-content">
        <div className="title--page-section-wrapper">
          <h2 className="title-text--page-section-header">Notifications</h2>
        </div>
        <div className="page-section-wrapper" />
      </div>
    </div>
  </div>
);

export default Home;
