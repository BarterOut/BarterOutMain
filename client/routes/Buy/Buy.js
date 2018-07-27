/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
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
    this._setToken(token);

    FetchService.GET(`/api/books/getAllBooks/${token}`)
      .then(response => response.json())
      .then((data) => {
        this._setPosts(data);
      });

    FetchService.GET(`/api/books/getUserMatches/${token}`)
      .then(response => response.json())
      .then((data) => {
        this._setMatches(data);
      });
  }

  _setToken(token) {
    this.setState({ token });
  }

  _setPosts(data) {
    this.setState({ posts: data });
  }

  _setMatches(data) {
    this.setState({ matches: data });
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  animateSearch() {
    // const searchWrapper = document.getElementById('searchInputWrapper');
    // if (searchWrapper.classList.contains('searchInputWrapperBig')) {
    //   searchWrapper.classList.remove('searchInputWrapperBig');
    // } else {
    //   searchWrapper.classList.add('searchInputWrapperBig');
    // }
  }

  search(query) {
    if (query === '') {
      FetchService.GET(`/api/books/getAllBooks/${this.state.token}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ posts: data });
        })
        .catch(err => console.warn(err));
      return;
    }
    const auth = new AuthService();
    const token = auth.getToken();
    FetchService.GET(`/api/books/search/${query}/${token}`)
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
          <TopBar page="Buy" />

          <div className="page-content">
            <div
              id="searchInputWrapper"
              // onClick={this.animateSearch.bind(this)}
              className="searchInputWrapper"
              // tabIndex="-1"
            >
              <input
                autoComplete="off"
                className="searchInput"
                // onClick={this.animateSearch.bind(this)}
                onChange={this.updateInputValue.bind(this)}
                placeholder="Search Books"
                type="text"
                name="name"
              />
            </div>
            <p className="searchInfo">
              * You can search for Book Name, Edition, Class, or Price, note
              that the class must be in the same format as on the book posting, (e.g. MTH 101, WRT 105, etc).
            </p>
            <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">Your Matches</h2></div>
            <div className="page-section-wrapper">
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
            <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">New Arrivals</h2></div>
            <div className="page-section-wrapper">
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
