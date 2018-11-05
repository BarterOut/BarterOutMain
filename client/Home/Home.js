/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';

import './Home.css';
import TopBar from '../components/TopBar/TopBar';
import SideNav from '../components/SideNav/SideNav';
import Notification from '../components/Notification/Notification';
import BookPost from '../components/BookPost/BookPost';

import FetchService from '../services/FetchService';
import AuthService from '../services/AuthService';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      notifications: [],
      matches: [],
      numberOfBooksBought: 0,
      numberOfBooksSold: 0,
      moneyMade: 0,
    };

    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.getNotifications();
    this.getUserStatistics();
    this.getMatches();
  }

  getMatches() {
    FetchService.GET(`/api/books/getUserMatches/${this.Auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ matches: data });
      });
  }

  getNotifications() {
    FetchService.GET(`/api/user/getNotifications/${this.Auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ notifications: data });
      });
  }

  getUserStatistics() {
    FetchService.GET(`/api/user/getUserStatistics/${this.Auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ numberOfBooksBought: data.numberOfBooksBought });
        this.setState({ numberOfBooksSold: data.numberOfBooksSold });
        this.setState({ moneyMade: data.moneyMade });
      });
  }

  render() {
    return (
      <div className="app-wrapper">
        <SideNav
          selected="dash"
        />

        <div className="right-content">
          <TopBar page="Your Dashboard" />
          <div className="page-content">
            {/* <h2>Welcome Back!</h2> */}
            <div className="stats-section">
              <div className="stat-wrap">
                <div className="title--page-section-wrapper--stat">
                  <h2 className="title-text--page-section-header">Bought</h2>
                </div>
                <div className="page-section-wrapper--stat">
                  <h2 className="stat-text">{this.state.numberOfBooksBought}</h2>
                </div>
              </div>
              <div className="stat-wrap">
                <div className="title--page-section-wrapper--stat">
                  <h2 className="title-text--page-section-header">Sold</h2>
                </div>
                <div className="page-section-wrapper--stat">
                  <h2 className="stat-text">{this.state.numberOfBooksSold}</h2>
                </div>
              </div>
              <div className="stat-wrap">
                <div className="title--page-section-wrapper--stat">
                  <h2 className="title-text--page-section-header">$$ Made</h2>
                </div>
                <div className="page-section-wrapper--stat">
                  <h2 className="stat-text">${this.state.moneyMade}</h2>
                </div>
              </div>
            </div>

            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Your Matches</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.matches.map(post => (
                <BookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                  edition={post.edition}
                  price={post.price}
                  status={post.inCart}
                  condition={post.condition}
                  comments={post.comments}
                />
              ))}
            </div>


            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Notifications</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.notifications.map(notification => (
                <Notification
                  key={notification._id}
                  date={notification.date}
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
