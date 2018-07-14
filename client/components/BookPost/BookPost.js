/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
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
    this._setID();
  }

  _setID() {
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

  confirmBuy() {
    // e.style.display = 'none';
    // const button = document.getElementsByClassName(this.props.name);
    // console.log(button);
    // button.style.visibility = 'visible';
    // button.style.opacity = '1';
  }

  render() {
    return (
      <div className="post">
        <div className="leftBP">
          <span className="bookSubject">{this.props.subject}</span>
          <span className="bookName">{this.props.name}</span>
          <span className="bookEdition">Edition: {this.props.edition}</span>
        </div>
        <div id="vertical-line" />
        <div className="leftBP">
          <div>
            <span className="condition">{this.props.condition}</span>
             for <span className="price">${this.props.price}</span>
          </div>
          <span className="comments"><i>{this.props.comments || 'No comments'}</i></span>
        </div>
        <div className="rightBP">
          <button
            className="button"
            onClick={this.confirmBuy.bind(this)}
          >Add to Cart
          </button>
          {/* <button
            className="confirmButton button"
            id={this.props.name}
            onClick={this.buyBook.bind(this)}
          >Confirm Buy
          </button> */}
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
