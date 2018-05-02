import React, { Component } from 'react';

import './BookPost.css';

class BookPost extends Component {
  constructor() {
    super();
    console.log('something construct');
    this.state = {
      id: this.props.key,
    };
  }

  componentDidMount() {
    console.log('something');
    console.log(this.state.id);
  }

  render() {
    return (
      <ul className="post">
        <span>{this.props.name}</span>
        <span>{this.props.subject} {this.props.courseNumber}</span>
        <span>{this.props.edition} Edition</span>
        <span>${this.props.price}</span>
        <span>{this.props.ISBN}</span>
        <span>{this.props.condition}</span>
        <span>Contact: <a href="#">{this.props.owner}</a></span>
        <span>Comments: {this.props.comments}</span>
      </ul>
    );
  }
}


export default BookPost;
