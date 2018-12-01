/**
 * @file React component for a textbook posting of a requested book.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

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
          <span className="bookEdition">{moment.unix(this.props.date / 1000).format('L')}</span>
        </div>
        <div className="vertical-line" />
        <div className="leftBP" />
        <div className="rightBP">
          <button
            className="button"
            onClick={this.deleteBook}
          >Unrequest
          </button>
        </div>
      </div>
    );
  }
}

// Props validation
RequestBookPost.propTypes = {
  date: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  subject: propTypes.string.isRequired,
};

export default RequestBookPost;
