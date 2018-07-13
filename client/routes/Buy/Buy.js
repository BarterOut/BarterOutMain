/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import BookPost from '../../components/BookPost/BookPost';

import '../../baseStyles.css';

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      matches: [],
      token: String,
    };
  }

  componentWillMount() {
    const auth = new AuthService();
    const token = auth.getToken();
    this.setState({ token });

    FetchService.GET(`/api/books/displayAllBooks/${token}`, {})
      .then(response => response.json())
      .then((data) => {
        this.setState({ posts: data });
      });

    FetchService.GET(`/api/books/showMatches/${token}`, {})
      .then(response => response.json())
      .then((data) => {
        this.setState({ matches: data });
      });
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    if (query === '') {
      FetchService.GET(`/api/books/displayAllBooks/${this.state.token}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ posts: data });
        })
        .catch(err => console.warn(err));
      return;
    }
    FetchService.GET(`/api/books/searchBook/${query}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ posts: data });
      })
      .catch(err => console.warn(err));
  }

  render() {
    let posts = [];
    let matches = [];
    if (this.state.posts) {
      posts = this.state.posts;
    }
    if (this.state.matches) {
      matches = this.state.matches;
    }
    return (
      <div className="app-wrapper">
        <SideNav selected="buy" />
        <div className="right-content">
          <TopBar />

          <div className="page-content">
            <input
              autoComplete="off"
              className="searchInput"
              onChange={this.updateInputValue.bind(this)}
              placeholder="Search Books"
              type="text"
              name="name"
            />
            <div className="page-section-wrapper">
              <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">Your Matches</h2></div>
              {matches.map(post => (
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
            <div className="page-section-wrapper">
              <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">New Arrivals</h2></div>
              {posts.map(post => (
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
        </div>
      </div>
    );
  }
}

export default Buy;
