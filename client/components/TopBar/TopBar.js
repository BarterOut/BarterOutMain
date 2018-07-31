/**
 * @file Reusable React component for the top bar of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

import '../../baseStyles.css';

import './TopBar.css';

class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };

    this.AUTH = new AuthService();

    this._logout = this._logout.bind(this);
  }

  _updateRedirect(value) {
    this.setState({ redirect: value });
  }

  _logout() {
    this.AUTH.logout();
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />);
    }

    return (
      <div className="bar-wrapper">
        <div className="left-bar part">
          <Link to="/cart" href="/cart">
            <button className="button" id="cart">Cart</button>
          </Link>
        </div>
        <div className="middle-bar part">
          <h4><b>{this.props.page}</b></h4>
        </div>
        <div className="right-bar part">
          <button className="button" onClick={this._logout}>Logout</button>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  page: propTypes.string.isRequired,
};

export default TopBar;
