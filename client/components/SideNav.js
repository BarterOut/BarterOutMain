/**
 * @file Reusable React component for the side nav of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../baseStyles.css';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: Number,
    };

    console.log(this.state.selectedID);
  }

  render() {
    return (
      <div id="wrapper">
        <div id="profile-wrapper">
          <div>TEMP</div>
          <div>TEMP</div>
        </div>
        <div id="link-wrapper">
          <Link className="selected" to="/home" href="/home">Home</Link>
          <Link to="/buy" href="/buy">Buy</Link>
          <Link to="/sell" href="/sell">Sell</Link>
          <Link to="/track" href="/track">Track</Link>
          <Link to="/help" href="/help">Help</Link>
        </div>
      </div>
    );
  }
}

export default SideNav;
