/**
 * @file NavBar.js
 * @description Navbar.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import AuthService from '../../services/AuthService';

import logo from '../../images/logo-white.png';

class NavBar extends Component {
  constructor() {
    super();

    this.state = {};
    this.logout = this.logout.bind(this);
    this.AUTH = new AuthService();
  }

  componentDidMount() {
    this.updatedSelected();
  }

  updatedSelected() {
    const elem = document.getElementById(this.props.page);
    elem.classList.add('active');
  }

  logout(e) {
    e.preventDefault();
    this.AUTH.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/home">
          <img src={logo} alt="logo" className="logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item px-2">
              <Link className="nav-link" id="home" href="/home" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" id="manage" href="/manage/posts" to="/manage/posts">
                Manage
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" id="settings" href="/settings" to="/settings">
                Settings
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" id="cart" href="/cart" to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item px-2">
              <Link className="nav-link" id="help" href="/help" to="/help">
                Help
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-0">
            <li className="nav-item px-2">
              <a className="nav-link" onClick={this.logout} href="/">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

// Props validation
NavBar.propTypes = {
  page: propTypes.string,
};

export default NavBar;
