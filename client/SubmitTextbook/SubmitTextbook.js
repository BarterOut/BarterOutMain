import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './SubmitTextbook.css';

class SubmitTextbook extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      posts: []
    }
  }

 componentDidMount() {
    this.callApi('/api/displayAllBooks')
      .then(res => {
        console.log(res);
        this.setState({posts: res});
      })
      .catch(err => console.log(err));
  }

  async callApi (url) {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="big-wrapper">
      <div className="search-bar">
      <input className="searchInput" placeholder="Search for Textbook" type="text" name="name" />
      </div>
      <div className="wrapper">
        <h2>Add a new Textbook:</h2>
        <form className="inputs" method="POST" action="/api/postBook">
          <input className="inputForTextbook" placeholder="Name" type="text" name="name" required />
          <input className="inputForTextbook" placeholder="Edition" type="text" name="edition" required />
          <input className="inputForTextbook" placeholder="Subject" type="text" name="subject" required />
          <input className="inputForTextbook" placeholder="Course Number" type="number" name="courseNumber" required />
          <input className="inputForTextbook" placeholder="Price" type="number" name="price" required />
          <input className="inputForTextbook" placeholder="ISBN" type="number" name="ISBN" />
          <input className="inputForTextbook" placeholder="Condition" type="text" name="condition" required />
          <input className="inputForTextbook" placeholder="Email" type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$" name="owner" required />
          <input className="inputForTextbook" placeholder="Comments" type="text" name="comments" />
          <button className="button" type="submit">Submit</button>
        </form>
      </div>
      </div>
    )
  }
}

export default SubmitTextbook;

const searchElement = document.getElementsByClassName('searchInput');
console.log(searchElement);
// searchElement[0].addEventListener('keypress', evt => {
//   console.log(evt);
// });