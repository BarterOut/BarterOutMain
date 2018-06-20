/**
 * @file React component for the careers route.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.1
 */

import React from 'react';

import './careers.css';

const Careers = () => {
  return (
    <div className="app">
      <div className="careersPage">
        <div className="container">
          <div className="pageText animated fadeIn">
            <h1>Careers</h1>
            <p>
              Are you a talented IOS, Android, or React.js developer? Are you passionate about
              marketing or business strategy? If you think you fit the bill,
              fill out <a href="#"> this</a> form and we will get back to you soon!
            </p>
            <a id="backLink" href="/">Click Here to Go Back to BarterOut</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
