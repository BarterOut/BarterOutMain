/**
 * @file Reusable React component for the top bar of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../services/AuthService';

import '../../baseStyles.css';

import './TopBar.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    const Auth = new AuthService();
    if (Auth.getToken() === null) {
      this.setState({ redirect: true });
    }
  }

  _logout() {
    console.log('loggin out');
    const Auth = new AuthService();
    Auth.logout();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div id="bar-wrapper">
        <div className="left-bar part">
          <button className="button" id="cart">Cart</button>
        </div>
        <div className="middle-bar part">
          School: U of R
        </div>
        <div className="right-bar part">
          <button className="button" onClick={this._logout.bind(this)}>Logout</button>
        </div>
      </div>
    );
  }
}

export default TopBar;
