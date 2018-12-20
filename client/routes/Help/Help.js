/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';

import MaterialIcon from 'react-google-material-icons';
import NavBar from '../../components/NavBar/NavBar';

const Help = () => (
  <div>
    <NavBar />
    <div className="container my-2" style={{fontFamily: 'Lora'}}>
      <h1 className="mt-5 mb-4">Contact</h1>
      <p className="mb-4">
        If you have any question or simply wanna say Hi,<br/>
        please feel free to reach out to us.
      </p>
      <p>
        office@barterout.com |
        <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/BarterOut/"> Facebook</a> |
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/company/18490388/"> LinkedIn</a>
      </p>
    </div>
  </div>
);

export default Help;
