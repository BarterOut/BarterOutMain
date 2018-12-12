/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import React, { Component } from 'react';
import ReactModal from 'react-modal';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import BookPost from '../../components/Posts/BookPost/BookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';
import ErrorService from '../../services/ErrorService';

import BuyBook from '../../components/BuyBook/BuyBook';
import Search from '../../components/Search/Search';

import '../../barterout.css';

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      query: '',
      loading: false,
      showModal: false,
      displaySearch: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.auth = new AuthService();
  }

  componentWillMount() {
    this.getBooks();
  }

  getBooks() {
    this.setState({ loading: true });
    FetchService.GET(`/api/books/getAllBooks/${this.auth.getToken()}`)
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      });
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  search(query) {
    this.setState({ loading: true });
    this.setState({ posts: [] });
    if (query === '') {
      FetchService.GET(`/api/books/getAllBooks/${this.auth.getToken()}`)
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ posts: data });
        })
        .catch(err => ErrorService.parseError(err));
      return;
    }

    FetchService.GET(`/api/books/search/${query}/${this.auth.getToken()}`)
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(err => ErrorService.parseError(err));
  }

  render() {
    let posts = [];
    if (this.state.posts) {
      posts = this.state.posts;
    }
    return (
      <div className="app-wrapper">
        <SideNav selected="buy" />
        <div className="right-content">
          <TopBar page="Buy" />

          <div className="page-content">
            <div
              id="searchInputWrapper"
              className="searchInputWrapper"
            >
              <input
                autoComplete="off"
                className="searchInput"
                onClick={this.animateSearch}
                onChange={this.updateInputValue}
                placeholder="Search Books"
                type="text"
                name="name"
              />
            </div>
            {this.state.displaySearch && <Search query={this.state.query} />}
            <p className="searchInfo">
              You can search for books by <b>title, edition, or course code.</b> <br />
              <em>
                *Note that the course code must be in the same format as on the book posting,
                (e.g. MTH 101, WRT 105, etc).
              </em>
            </p>
            <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">New Arrivals</h2></div>
            <div className="page-section-wrapper">
              {
                this.state.loading &&
                <div className="loading" />
              }
              {
                this.state.posts.length == 0 &&
                <h4 id="no-results">No Results for Query<br />Please request book below.</h4>
              }
              {posts.map(post => (
                <BookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                  edition={post.edition}
                  inCart={post.inCart}
                  price={post.price}
                  status={post.status}
                  condition={post.condition}
                  comments={post.comments}
                />
              ))}
            </div>
            <div>
              <h3>
                Don&apos;t see the book you are looking for? <br />
                Request it below and we will let you know when someone posts it.
              </h3>
              <button className="button" onClick={this.handleOpenModal}>Request a book</button>
            </div>
            <ReactModal
              className="modal"
              overlayClassName="overlay"
              isOpen={this.state.showModal}
              contentLabel="Request Book Modal"
              ariaHideApp={false}
            >
              <div className="top-modal-section">
                <button className="close-modal-button" onClick={this.handleCloseModal}>X</button>
              </div>
              <BuyBook />
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;
