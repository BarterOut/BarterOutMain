import React, { Component } from 'react';
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
    // console.log(sessionStorage.getItem('user')._id);
    axios.post('/api/clickBuy', {
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
    evt.target.style.display = 'none';
    const butt = document.getElementById(this.props.name);
    butt.style.display = 'inline-block';
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

export default BookPost;
