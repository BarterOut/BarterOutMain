import React, { Component } from 'react';

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
