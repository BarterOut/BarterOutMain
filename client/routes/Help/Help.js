/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

class Help extends Component {
  render() {
    return (
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
              <span>office@barterout.com</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
