/**
 * @file React component for a book posting on the app.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.1
 */

// TODO: fix confirm button

import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import './BookPost.css';

class BookPost extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  buyBook() {
    axios.post('/api/books/clickBuy', {
      bookID: this.state.id,
      userID: JSON.parse(sessionStorage.getItem('user'))._id,
    })
      .then((response) => {
        console.log(`Resp: ${response}`);
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
    console.log(`Buying book ${this.state.id}`);
    window.alert('Check your email for the next steps!');
    window.location.reload();
  }

  confirmBuy(evt) {
    const targetElement = evt;
    console.log(targetElement);
    targetElement.style.display = 'none';
    const button = document.getElementById(this.props.name);
    button.style.visibility = 'visible';
    button.style.opacity = '1';
  }

  render() {
    return (
      <div className="post">
        <div className="leftBP">
          <span className="bookName">{this.props.name}</span>
          <span className="bookEdition">{this.props.edition} Edition; Condition: {this.props.condition}</span>
          <span className="bookSubject">{this.props.subject}</span>
          <span className="bookSubject"><i>{this.props.comments}</i></span>
        </div>

        <div className="rightBP">
          <span className="bookPrice">${this.props.price}</span>
          <button
            className="button"
            onClick={this.confirmBuy.bind(this)}
          >Buy
          </button>
          <button
            className="confirmButton"
            id={this.props.name}
            onClick={this.buyBook.bind(this)}
          >Confirm Buy
          </button>
        </div>
      </div>
    );
  }
}

// Props validation
BookPost.propTypes = {
  comments: propTypes.string.isRequired,
  condition: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
};

export default BookPost;
