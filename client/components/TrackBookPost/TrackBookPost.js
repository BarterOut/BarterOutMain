/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import moment from 'moment';
import propTypes from 'prop-types';

class TrackBookPost extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="post">
        <div className="leftBP">
          <span className="bookSubject">{this.props.subject}</span>
          <span className="bookName">{this.props.name}</span>
          <span className="bookEdition">{moment.unix(this.props.date / 1000).format('L')}</span>
        </div>
        <div className="vertical-line" />
        <div className="leftBP">
          <div>
            <span className="condition">{this.props.condition}</span>
             for <span className="price">${this.props.price}</span>
          </div>
          <span className="comments"><i>{this.props.comments || 'No comments'}</i></span>
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
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
};

export default TrackBookPost;
