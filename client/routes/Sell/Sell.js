/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import BuyBook from '../../components/BuyBook/BuyBook';
import SellBook from '../../components/SellBook/SellBook';

class Sell extends Component {
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
          selected="sell"
        />

        <div className="right-content">
          <TopBar />
          <div className="page-content">
            <div className="page-section-wrapper">
              <div className="title--page-section-wrapper">
                <h2 className="title-text--page-section-header">Sell Your Textbooks</h2>
              </div>
              Have textbooks you don't need anymore?
              Sell them now and make some extra $$$
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
            </div>
            {!this.state.buyHidden && <BuyBook />}
            {!this.state.sellHidden && <SellBook />}
          </div>
        </div>
      </div>
    );
  }
}

export default Sell;
