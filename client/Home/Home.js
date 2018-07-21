/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import './Home.css';
import TopBar from '../components/TopBar/TopBar';
import SideNav from '../components/SideNav/SideNav';
import Notification from '../components/Notification/Notification';

import FetchService from '../services/FetchService';
import AuthService from '../services/AuthService';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
    };

    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.getNotifications();
  }

  getNotifications() {
    FetchService.GET(`/api/auth/getNotifications/${this.Auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ notifications: data });
      });
  }

  render() {
    return (
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
            <div className="page-section-wrapper">
              {this.state.notifications.map(notification => (
                <Notification
                  date={notification.date.toString()}
                  message={notification.message}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
