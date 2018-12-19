/**
 * @file Reusable React component for the side nav of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../barterout.css';

import './SideNav.css';

class SideNav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="sidenav">
        <button className="btn btn-primary my-1">Post Your Book</button>
        <h3>Filter</h3>
        <div className="list-group">
          <a className="list-group-item list-group-item-action" href="/">All</a>
          <a className="list-group-item list-group-item-action" href="/">School of Arts and Sciences</a>
          <a className="list-group-item list-group-item-action" href="/">School of Engineering</a>
        </div>
      </div>
    );
  }
}

export default SideNav;
