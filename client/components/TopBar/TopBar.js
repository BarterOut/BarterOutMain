/**
 * @file Reusable React component for the top bar of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

import MaterialIcon from 'react-google-material-icons';
// import FetchService from '../../services/FetchService';

import '../../baseStyles.css';

import './TopBar.css';

class TopBar extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  // componentDidMount() {
  //   const Auth = new AuthService();
  //   if (Auth.getToken() === null) {
  //     this._updateRedirect(true);
  //   }

  //   FetchService.GET(`/api/user/getUserData/${Auth.getToken()}`)
  //     .then(response => response.json())
  //     .then((data) => {
  //       this._updateSchool(data.user.university);
  //     });
  // }

  // _updateSchool(value) {
  //   this.setState({ school: value });
  // }

  _updateRedirect(value) {
    this.setState({ redirect: value });
  }

  _logout() {
    const Auth = new AuthService();
    Auth.logout();
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/" />);
    }

    return (
      <div id="bar-wrapper">
        <div className="left-bar part">
          <Link to="/cart" href="/cart">
            <button className="button" id="cart"><MaterialIcon icon="shopping_cart" />Cart</button>
          </Link>
        </div>
        <div className="middle-bar part">
          <h4><b>{this.props.page}</b></h4>
        </div>
        <div className="right-bar part">
          <button className="button" onClick={this._logout.bind(this)}>Logout</button>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  page: propTypes.string.isRequired,
};

export default TopBar;
