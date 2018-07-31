/**
 * @file React component for a textbook posting on the webapp.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class PersonalBookPost extends Component {
  constructor(props) {
    super(props);

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

  deleteBook() {
    const AUTH = new AuthService();
    FetchService.POST('/api/books/deleteBook', {
      bookID: this.state.id,
      token: AUTH.getToken(),
    })
      .then(() => {
        window.location.reload();
      });
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
            onClick={this.deleteBook.bind(this)}
          >Remove
          </button>
        </div>
      </div>
    );
  }
}

// Props validation
PersonalBookPost.propTypes = {
  comments: propTypes.string,
  condition: propTypes.string.isRequired,
  edition: propTypes.number.isRequired,
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  subject: propTypes.string.isRequired,
};

export default PersonalBookPost;
