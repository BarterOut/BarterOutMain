/**
 * @file BookPost.js
 * @description React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../../services/FetchService';
import AuthService from '../../../services/AuthService';

import './BookPost.css';

class BookPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inCart: false,
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    if (this.props.status === 42) {
      this._setInCart();
    }
  }

  _setInCart() {
    this.setState({ inCart: true });
  }

  addToCart() {
    const AUTH = new AuthService();
    FetchService.POST('/api/user/addToCart', {
      token: AUTH.getToken(),
      bookID: this.props.id,
    })
      .then(() => {
        this.setState({ inCart: true });
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
        <div className="vertical-line" />
        <div className="leftBP">
          <span className="comments"><i>{this.props.comments || 'No comments'}</i></span>
        </div>
        <div className="rightBP">
          <div>
            <span className="condition">{this.props.condition}</span>
             - <span className="price">${this.props.price}*</span>
          </div>
          {
            !this.state.inCart &&
            <button
              className="button"
              onClick={this.addToCart}
            >Add to Cart
            </button>
          }
          {
            this.state.inCart &&
            <button
              className="button green"
            >Added to Cart
            </button>
          }
        </div>
      </div>
    );
  }
}

// Props validation
BookPost.propTypes = {
  comments: propTypes.string,
  condition: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  status: propTypes.number,
  subject: propTypes.string.isRequired,
};

export default BookPost;
