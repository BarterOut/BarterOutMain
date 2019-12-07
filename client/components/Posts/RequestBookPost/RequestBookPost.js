/**
 * @file React component for a textbook posting of a requested book.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import FetchService from '../../../services/FetchService';

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
    FetchService.POST('/api/user/deleteRequest', {
      bookID: this.state.id,
    })
      .then(() => {
        window.location.reload();
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
          <button
            className="btn btn-primary float-right"
            type="button"
            onClick={this.deleteBook}
          >
            Unrequest
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
