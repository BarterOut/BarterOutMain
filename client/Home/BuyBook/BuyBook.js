import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './BuyBook.css';

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

  postToDatabase() {
    console.log('posting buy');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const ID = user._id;
    const payload = {
      name: this.state.name,
      course: this.state.course,
      status: 0,
      owner: ID,
    };

    fetch(
      '/api/buyBook',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ payload }),
      },
    )
      .then((response) => { response.json(); })
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    return (
      <div className="wrapper-custom">
        <div className="modalContent">
          <h2>What are you looking for?</h2>
          <form className="input-wrapper">
            <span className="inputLabelHome">Title of Book *</span>
            <input
              autoComplete="off"
              className="inputForLogin"
              placeholder="e.g. Intro to Probability"
              type="text"
              name="name"
              onChange={this.onChange.bind(this)}
              required
            />
            <span className="inputLabelHome">Course *</span>
            <input
              autoComplete="off"
              className="inputForLogin"
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
