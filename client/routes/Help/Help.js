/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

const Help = () => (
  <div className="app-wrapper">
    <SideNav
      selected="help"
    />

    <div className="right-content">
      <TopBar page="Help" />
      <div className="page-content">
        <div className="title--page-section-wrapper">
          <h2 className="title-text--page-section-header">Help</h2>
        </div>
        <div className="page-section-wrapper">
          <div id="help-content">
            <h4>Having trouble with something on the website?</h4>
            <h4>Contact us at <a href="mailto:office@barterout.com">office@barterout.com</a></h4>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Help;
