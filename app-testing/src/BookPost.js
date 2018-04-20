import React, { Component } from 'react';

import './BookPost.css'

class BookPost extends Component {
  render()  {
    return (
      <div className="post">
        <span>{this.props.title}</span>
        <span>{this.props.title}</span>
        <span>{this.props.title}</span>
        <span>{this.props.title}</span>
      </div>
    )
  }
}


export default BookPost;