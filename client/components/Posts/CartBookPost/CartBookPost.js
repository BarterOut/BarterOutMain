/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../../services/FetchService';
import AuthService from '../../../services/AuthService';

class CartBookPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };

    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    this._setID();
  }

  _setID() {
    this.setState({ id: this.props.id });
  }

  removeFromCart() {
    const AUTH = new AuthService();
    FetchService.POST('/api/user/removeFromCart', {
      bookID: this.state.id,
      token: AUTH.getToken(),
    })
      .then(() => {
        window.location.reload();
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
          <div>
            <span className="condition">{this.props.condition}</span>
             - <span className="price">${this.props.price}*</span>
          </div>
          <span className="comments"><i>{this.props.comments || 'No comments'}</i></span>
        </div>
        <div className="rightBP">
          <button
            className="button"
            onClick={this.removeFromCart}
          >Remove
          </button>
        </div>
      </div>
    );
  }
}

// Props validation
CartBookPost.propTypes = {
  comments: propTypes.string,
  condition: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
};

export default CartBookPost;
