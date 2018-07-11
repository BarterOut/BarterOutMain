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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      buyHidden: true,
      sellHidden: true,
    };
  }
  toggleBuyVisibility() {
    this.setState({ buyHidden: !this.state.buyHidden });
  }

  toggleSellVisibility() {
    this.setState({ sellHidden: !this.state.sellHidden });
  }

  render() {
    return (
      <div className="app-wrapper">
        <SideNav
          selected="home"
        />

        <div className="right-content">
          <TopBar />
          <button
            className="button"
            onClick={this.toggleBuyVisibility.bind(this)}
          >Find Book
          </button>
          <button
            className="button"
            onClick={this.toggleSellVisibility.bind(this)}
          >Sell Book
          </button>
          {!this.state.buyHidden && <BuyBook />}
          {!this.state.sellHidden && <SellBook />}
        </div>
      </div>
    );
  }
}

export default Home;
