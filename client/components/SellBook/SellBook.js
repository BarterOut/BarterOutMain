/**
 * @file React component for posting a book you are looking to sell.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class SellBook extends Component {
  constructor() {
    super();
    this.state = {
      name: String,
      edition: Number,
      course: String,
      price: Number,
      ISBN: String,
      condition: 'Good',
      comments: String,
      correctlyFilledOut: true,
    };

    this.onChange = this.onChange.bind(this);
    this.postToDatabase = this.postToDatabase.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  formSubmit(e) {
    e.preventDefault();
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ condition: evt.target[index].value });
  }

  postToDatabase() {
    const profile = AuthService.getProfile();

    if (!this._validateInputs()) {
      return;
    }

    const payload = {
      name: this.state.name,
      edition: this.state.edition,
      course: this.state.course,
      price: this.state.price,
      status: 0,
      date: Date.now(),
      ISBN: this.state.ISBN,
      condition: this.state.condition,
      comments: this.state.comments,
      owner: profile.userInfo._id,
    };

    FetchService.POST('/api/books/postBook', payload)
      .then(() => {
        // We would fire off event for redux here to re-fetch books
        window.location.reload();
      });
  }

  _validateInputs() {
    if (!/^[A-Z]{3} \d{3}$/.test(this.state.course)) {
      this.setState({ correctlyFilledOut: false });
      return false;
    }

    if (this.state.price > 200 || this.state.price < 1) {
      this.setState({ correctlyFilledOut: false });
      return false;
    }

    if (this.state.edition < 0) {
      this.setState({ correctlyFilledOut: false });
      return false;
    }

    if (this.state.name === ''
        || this.state.edition === ''
        || this.state.price === ''
        || this.state.course === '') {
      this.setState({ correctlyFilledOut: false });
      return false;
    }

    return true;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          {
            !this.state.correctlyFilledOut
            && (
            <div className="alert alert-warning" role="alert">
              Please ensure all fields are filled out correctly.
            </div>
            )}
          <div className="my-2">
            <label htmlFor="title">
              Title of Book*
              <input
                autoComplete="off"
                className="form-control"
                id="title"
                placeholder="e.g. Calculus and Early Transcendentals"
                type="text"
                name="name"
                onChange={this.onChange}
                required
              />
            </label>
          </div>
          <div className="my-2">
            <label htmlFor="edition">
              Edition*
              <input
                autoComplete="off"
                className="form-control"
                placeholder="e.g. 11"
                type="number"
                id="edition"
                min="0"
                max="900"
                name="edition"
                onChange={this.onChange}
                required
              />
            </label>
            <small id="passwordHelpBlock" className="form-text text-muted">
              Must be a number greater than 0.
            </small>
          </div>
          <div className="my-2">
            <label htmlFor="course">Course Code*
              <input
                autoComplete="off"
                className="form-control"
                placeholder="e.g. MTH 101"
                type="text"
                id="course"
                pattern="^[A-Z]{3} \d{3}$"
                name="course"
                onChange={this.onChange}
                required
              />
            </label>
            <small id="passwordHelpBlock" className="form-text text-muted">
              Course code must be three uppercase letters followed by a space,
              followed by three numbers.
            </small>
            <div className="invalid-feedback">
              Please provide a course code.
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="price">Price*
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  autoComplete="off"
                  className="form-control"
                  type="number"
                  min="0"
                  max="200"
                  id="price"
                  name="price"
                  onChange={this.onChange}
                  required
                />
              </div>
            </label>
          </div>
          <div className="my-2">
            <label htmlFor="isbn">ISBN
              <input
                autoComplete="off"
                className="form-control"
                placeholder="ISBN"
                id="isbn"
                type="number"
                pattern="^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$"
                onChange={this.onChange}
                name="ISBN"
              />
            </label>
          </div>
          <div className="my-2">
            <label htmlFor="condition">Condition*
              <select defaultValue="Good" onChange={this.selectChange} className="form-control" id="condition">
                <option value="Poor">Poor</option>
                <option value="Fair">Fair</option>
                <option value="Good">Good</option>
                <option value="Like New">Like New</option>
              </select>
            </label>
          </div>
          <label htmlFor="comments">Comments
            <input
              autoComplete="off"
              className="form-control"
              placeholder="Comments"
              id="comments"
              type="text"
              onChange={this.onChange}
              name="comments"
            />
          </label>
          <div>
            <button
              type="submit"
              className="btn btn-primary my-2 float-right"
              onClick={this.postToDatabase}
            >Sell Now
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SellBook;
