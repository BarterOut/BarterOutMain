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
    axios.post('/api/clickBuy', {
      bookID: this.state.id,
      userID: sessionStorage.getItem('user')._id,
    })
      .then((response) => {
        console.log(`Resp: ${response}`);
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
    console.log(`Buying book ${this.state.id}`);
  }

  render() {
    return (
      <div className="post">
        <div className="leftBP">
          <span className="bookName">{this.props.name}</span>
          <span className="bookEdition">{this.props.edition} Edition</span>
          <span className="bookSubject">{this.props.subject}</span>
        </div>

        <div className="rightBP">
          <span className="bookPrice">${this.props.price}</span>
          <button
            className="button"
            onClick={this.buyBook.bind(this)}
          >Buy
          </button>
        </div>
      </div>
    );
  }
}

export default BookPost;
