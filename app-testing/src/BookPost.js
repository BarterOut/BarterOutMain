import React, { Component } from 'react';

import './BookPost.css'

class BookPost extends Component {
  render()  {
    return (
      <div className="post">
        <span>{this.props.name}</span>
        <span>{this.props.subject}</span>
        <span>{this.props.edition}</span>
        <span>{this.props.courseNumber}</span>
        <span>{this.props.price}</span>
        <span>{this.props.ISBN}</span>
        <span>{this.props.condition}</span>
        <span>{this.props.owner}</span>
        <span>{this.props.comments}</span>
      </div>
    )
  }
}


export default BookPost;