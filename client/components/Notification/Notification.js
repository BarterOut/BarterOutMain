/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import './Notification.css';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };
  }

  render() {
    return (
      <div className="notification">
        <span className="date">{this.props.date}</span>
        <span className="message">{this.props.message}</span>
      </div>
    );
  }
}

// Props validation
Notification.propTypes = {
  date: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
};

export default Notification;
