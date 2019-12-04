/**
 * @file LandingBookPost.js
 * @description React component for a textbook posting on the landing page.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import Util from '../../../services/util';

class LandingBookPost extends Component {
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
          <span className="bookEdition">
            {Util.ordinalSuffixOf(this.props.edition)}
            &nbsp;Edition
          </span>
        </div>
        <div className="vertical-line" />
        <div className="middleBP">
          <span className="comments"><i>{this.props.comments || 'No comments'}</i></span>
        </div>
        <div className="rightBP">
          <div>
            <span className="condition">
              {this.props.condition}
            </span>
            &nbsp;-&nbsp;
            <span className="price">
              $
              {this.props.price}
              *
            </span>
          </div>
          <Link to="/login" href="/login">
            <button className="button" type="button">Add to Cart</button>
          </Link>
          <div><small className="text-muted">* Does not include 5% fee.</small></div>
        </div>
      </div>
    );
  }
}

// Props validation
LandingBookPost.propTypes = {
  comments: propTypes.string,
  condition: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
};

export default LandingBookPost;
