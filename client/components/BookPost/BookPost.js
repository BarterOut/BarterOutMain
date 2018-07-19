/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import './BookPost.css';

class BookPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this._setID();
  }

  _setID() {
    this.setState({ id: this.props.id });
  }

  addToCart() {
    const AUTH = new AuthService();
    FetchService.POST('/api/auth/addToCart', {
      token: AUTH.getToken(),
      bookID: this.state.id,
    });
  }

  render() {
    return (
      <div className="post">
        <div className="leftBP">
          <span className="bookSubject">{this.props.subject}</span>
          <span className="bookName">{this.props.name}</span>
          <span className="bookEdition">Edition: {this.props.edition}</span>
        </div>
        <div id="vertical-line" />
        <div className="leftBP">
          <div>
            <span className="condition">{this.props.condition}</span>
             for <span className="price">${this.props.price}</span>
          </div>
          <span className="comments"><i>{this.props.comments || 'No comments'}</i></span>
        </div>
        <div className="rightBP">
          <button
            className="button"
            onClick={this.addToCart.bind(this)}
          >Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

// Props validation
BookPost.propTypes = {
  comments: propTypes.string.isRequired,
  condition: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
};

export default BookPost;
