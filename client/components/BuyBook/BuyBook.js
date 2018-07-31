/**
 * @file React component for posting a book you are searching for.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import '../../baseStyles.css';

class BuyBook extends Component {
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
    if (!this._validateInputs()) {
      return;
    }

    const AUTH = new AuthService();

    const payload = {
      name: this.state.name,
      course: this.state.course,
      status: 0,
      owner: AUTH.getProfile().userInfo._id,
    };

    FetchService.POST('/api/books/requestBook', { payload, token: AUTH.getToken() })
      .then(() => {
        window.location.reload();
      });
  }

  _validateInputs() {
    if (!/^[A-Z]{3} \d{3}$/.test(this.state.course)) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="wrapper-custom">
        <h2>What are you looking for?</h2>
        <form className="input-wrapper" onSubmit={this.formSubmit}>
          <span className="inputLabelHome">Title of Book *</span>
          <input
            autoComplete="off"
            className="formInput"
            placeholder="e.g. Intro to Probability"
            type="text"
            name="name"
            onChange={this.onChange}
            required
          />
          <span className="inputLabelHome">Course Code *</span>
          <input
            autoComplete="off"
            className="formInput"
            placeholder="e.g. MTH 101"
            type="text"
            pattern="^[A-Z]{3} \d{3}$"
            name="course"
            onChange={this.onChange}
            required
          />
          <div>
            <button
              className="button"
              onClick={this.postToDatabase}
            >Request
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BuyBook;
