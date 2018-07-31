
import React, { Component } from 'react';


import "./Dashboard.css"
import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';
import profile from '../images/barterOutProfilePhotoWebPage.png';

import Home from './Home/Home'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(sessionStorage.getItem('user')),
      name: '',
      university: '',
    };
  }

  async callApi(url) {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  // callHome() {
  //   this.callApi('/api/dashboard/Home')
  // }

  render() {
    return (
      <div className="app-wrapper">
      <div className="bar">
        <div className="right">
          <img className="logo" src={logoPic} alt="logo" />
        </div>
        <div className="left">
          <button
            className="button"
            onClick={this.logout.bind(this)}
          >Logout
          </button>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="profile-section">
          <img src={profile} alt="profile" className="profile-pic" />
          <h2>Profile</h2>
          <h4>{user.firstName} {user.lastName}</h4>
          <h4>{user.emailAddress}</h4>
          <h4>@{user.venmoUsername}</h4>
          <h4>CMC Box: {user.CMC}</h4>
          {/* <button
            className="button"
            onClick={this.toggleBuyVisibility.bind(this)}
          >Find Book
          </button>
          <button
            className="button"
            onClick={this.toggleSellVisibility.bind(this)}
          >Sell Book
          </button> */}
        </div>
      </div>
    </div>
      // <div>
      //   <h1>Test</h1>
      //   {/* <button onClick={this.callHome.bind(this)}>Go to home</button> */}
      // </div>
    )
  }
}

export default Dashboard;