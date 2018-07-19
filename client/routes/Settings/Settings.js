/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

class Settings extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <SideNav
          selected="settings"
        />

        <div className="right-content">
          <TopBar />
          <div className="page-content">
            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Settings</h2>
            </div>
            <div className="page-section-wrapper" />
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
