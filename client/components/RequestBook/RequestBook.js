/**
 * @file React component for requesting a book.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class RequestBook extends Component {
  constructor() {
    super();
    this.state = {
      name: String,
      course: String,
    };

    this.onChange = this.onChange.bind(this);
    this.postToDatabase = this.postToDatabase.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  cancel() {
    window.location.reload();
  }

  formSubmit(e) {
    e.preventDefault();
  }

  postToDatabase() {
    const payload = {
      name: this.state.name,
      course: this.state.course,
      status: 0,
      owner: AuthService.getProfile().userInfo._id,
    };

    FetchService.POST('/api/books/requestBook', { payload })
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              Title of Book*
              <input
                autoComplete="off"
                className="form-control"
                id="title"
                placeholder="e.g. Intro to Probability"
                type="text"
                name="name"
                onChange={this.onChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="courseCode">
              Course Code*
              <input
                autoComplete="off"
                id="courseCode"
                className="form-control"
                placeholder="e.g. MTH 101"
                type="text"
                pattern="^[A-Z]{3} \d{3}$"
                name="course"
                onChange={this.onChange}
                required
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-primary float-right"
              type="button"
              onClick={this.postToDatabase}
            >
              Request
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RequestBook;
