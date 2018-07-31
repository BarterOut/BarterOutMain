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
        <div className="modalContent">
          <h2>What are you looking for?</h2>
          <form className="input-wrapper" onSubmit={this.formSubmit.bind(this)}>
            <span className="inputLabelHome">Title of Book *</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="e.g. Intro to Probability"
              type="text"
              name="name"
              onChange={this.onChange.bind(this)}
              required
            />
            <span className="inputLabelHome">Course *</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="e.g. MTH 101"
              type="text"
              pattern="^[A-Z]{3} \d{3}$"
              name="course"
              onChange={this.onChange.bind(this)}
              required
            />
            <div>
              <a className="cancel" href="/home" onClick={this.cancel.bind(this)}>Cancel</a>
              <button
                className="button"
                onClick={this.postToDatabase.bind(this)}
              >Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default BuyBook;
