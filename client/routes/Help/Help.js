/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';

import NavBar from '../../components/NavBar/NavBar';

const Help = () => (
  <div>
    <NavBar />
    <div className="container my-2">
      <h2>Help</h2>
      <h6>Email office@barterout.com</h6>
    </div>
  </div>
);

export default Help;
