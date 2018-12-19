/**
 * @file TrackBookPost.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

import Util from '../../../services/util';

class TrackBookPost extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="card my-2">
        <div className="card-body">
          <div className="d-flex w-100 justify-content-between">
            <h6 className="mb-1">{this.props.subject}</h6>
            <small>{moment.unix(this.props.date / 1000).fromNow()}</small>
          </div>
          <h5 className="card-title">{this.props.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {Util.ordinalSuffixOf(this.props.edition)} Edition - {this.props.condition}
          </h6>

          <div>
            <p className="comments"><i>{this.props.comments || 'No comments'}</i></p>
          </div>
          <span className="price">${this.props.price}*</span>
          <span className="comments"><i>{this.props.type}</i></span>
        </div>
      </div>
    );
  }
}

// Props validation
TrackBookPost.propTypes = {
  comments: propTypes.string,
  condition: propTypes.string.isRequired,
  date: propTypes.number.isRequired,
  edition: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
};

export default TrackBookPost;
