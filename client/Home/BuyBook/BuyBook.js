import React, { Component } from 'react';

import styles from './BuyBook.css';

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
        <h2>Book to Buy:</h2>
        <form>
          <input
            className="inputForTextbook"
            placeholder="Name"
            type="text"
            name="name"
            onChange={this.onChange.bind(this)}
            required />
          <input
            className="inputForTextbook"
            placeholder="Course e.g. MTH 101"
            type="text" pattern="^[A-Z]{3} \d{3}$"
            name="course"
            onChange={this.onChange.bind(this)}
            required />
          <button className="button" onClick={this.postToDatabase.bind(this)}>Submit</button>
        </form>
      </div>
    );
  }
}

export default BuyBook;
