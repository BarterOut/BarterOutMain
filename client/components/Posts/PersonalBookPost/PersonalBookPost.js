/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

import FetchService from '../../../services/FetchService';
import AuthService from '../../../services/AuthService';
import Util from '../../../services/util';

class PersonalBookPost extends Component {
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

  reactivateBook() {
    const AUTH = new AuthService();
    FetchService.POST('/api/books/reactivateBooks', {
      bookID: this.state.id,
      token: AUTH.getToken(),
    })
      .then(() => {
        window.location.reload();
      });
  }

  deleteBook() {
    const AUTH = new AuthService();
    FetchService.POST('/api/books/deleteBook', {
      bookID: this.state.id,
      token: AUTH.getToken(),
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
          <h6 className="card-subtitle mb-2 text-muted">
            {Util.ordinalSuffixOf(this.props.edition)} Edition - {this.props.condition}
          </h6>

          <div>
            <p className="comments"><i>{this.props.comments || 'No comments'}</i></p>
          </div>
          <span className="price">${this.props.price}*</span>
          {
            this.props.status == 5
            && (
            <button
              className="btn mx-1 btn-secondary float-right"
              type="button"
              onClick={this.reactivateBook}
            >Reactivate
            </button>)
          }
          <button
            className="btn btn-primary float-right"
            type="button"
            onClick={this.deleteBook}
          >Remove
          </button>
          <div><small className="text-muted">* Does not include 5% fee.</small></div>
        </div>
      </div>
    );
  }
}

// Props validation
PersonalBookPost.propTypes = {
  comments: propTypes.string,
  condition: propTypes.string.isRequired,
  date: propTypes.number.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  status: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
};

export default PersonalBookPost;
