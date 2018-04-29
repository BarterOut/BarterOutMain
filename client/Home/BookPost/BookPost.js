import React from 'react';

import './BookPost.css';

const BookPost = (props) => {
  return (
    <ul className="post">
      <span>{props.name}</span>
      <span>{props.subject} {props.courseNumber}</span>
      <span>{props.edition} Edition</span>
      <span>${props.price}</span>
      <span>{props.ISBN}</span>
      <span>{props.condition}</span>
      <span>Comments: {props.comments}</span>
      <button>Buy</button>
    </ul>
  );
};

export default BookPost;
