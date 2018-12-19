/**
 * @file BookPost.js
 * @description React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import FetchService from '../../../services/FetchService';
import AuthService from '../../../services/AuthService';
import Util from '../../../services/util';

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
          {
            !this.state.inCart &&
            <button
              className="btn btn-primary float-right"
              onClick={this.addToCart}
            >Add to Cart
            </button>
          }
          {
            this.state.inCart &&
            <button
              className="btn btn-default float-right"
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
  date: propTypes.number.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  status: propTypes.number,
  subject: propTypes.string.isRequired,
};

export default BookPost;
