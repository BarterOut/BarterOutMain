/**
 * @file React component for posting a book you are looking to sell.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import propTypes from 'prop-types';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';
import ErrorService from '../../services/ErrorService';

import BookPost from '../../components/Posts/BookPost/BookPost';

import './Search.css';
import '../../barterout.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.search();
  }

  search() {
    this.setState({ loading: true });
    this.setState({ searchResults: [] });
    if (this.props.query === '') {
      FetchService.GET(`/api/books/getAllBooks/${this.state.token}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ searchResults: data });
        })
        .catch(err => ErrorService.parseError(err));
      return;
    }
    const auth = new AuthService();
    const token = auth.getToken();
    FetchService.GET(`/api/books/search/${this.props.query}/${token}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ searchResults: data });
      })
      .catch(err => ErrorService.parseError(err));
  }

  render() {
    return (
      <div className="search-results-wrapper">
        <div className="search-wrapper">
          {
            this.state.loading &&
            <div className="loading" />
          }
          {this.state.searchResults.map(post => (
            <BookPost
              key={post._id}
              id={post._id}
              name={post.name}
              subject={post.course}
              edition={post.edition}
              price={post.price}
              condition={post.condition}
              comments={post.comments}
            />
          ))}
        </div>
      </div>
    );
  }
}

// Props validation
Search.propTypes = {
  query: propTypes.string,
};

export default Search;
