/**
 * @file React component for a textbook posting of a requested book.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class RequestBookPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };

    this.deleteBook = this.deleteBook.bind(this);
  }

  componentDidMount() {
    this._setID();
  }

  _setID() {
    this.setState({ id: this.props.id });
  }

  deleteBook() {
    const AUTH = new AuthService();
    FetchService.POST('/api/user/deleteRequest', {
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
        </div>
        <div id="vertical-line" />
        <div className="leftBP" />
        <div className="rightBP">
          <button
            className="button"
            onClick={this.deleteBook}
          >Remove
          </button>
        </div>
      </div>
    );
  }
}

// Props validation
RequestBookPost.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  subject: propTypes.string.isRequired,
};

export default RequestBookPost;
