/**
 * @file React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.2
 */

import React, { Component } from 'react';
import ReactModal from 'react-modal';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import BookPost from '../../components/BookPost/BookPost';
import BuyBook from '../../components/BuyBook/BuyBook';
import Search from '../../components/Search/Search';

import '../../baseStyles.css';

class Buy extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      query: '',
      matches: [],
      loading: false,
      showModal: false,
      displaySearch: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.animateSearch = this.animateSearch.bind(this);
    this.auth = new AuthService();
  }

  componentWillMount() {
    const token = this.auth.getToken();

    FetchService.GET(`/api/books/getAllBooks/${token}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this._setPosts(data);
      });

    FetchService.GET(`/api/books/getUserMatches/${token}`)
      .then(response => response.json())
      .then((data) => {
        this._setMatches(data);
      });
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

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  animateSearch() {
    // this.setState({ displaySearch: !this.state.displaySearch });
  }

  search(query) {
    this.setState({ loading: true });
    this.setState({ posts: [] });
    if (query === '') {
      FetchService.GET(`/api/books/getAllBooks/${this.auth.getToken()}`)
        .then(response => response.json())
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ posts: data });
        })
        .catch(err => console.warn(err));
      return;
    }

    FetchService.GET(`/api/books/search/${query}/${this.auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(err => console.error(err));
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
              You can search for Book Name, Edition, or Class. * Note
              that the class must be in the same format as on the book posting,
              (e.g. MTH 101, WRT 105, etc).
            </p>
            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Your Matches</h2>
            </div>
            <div className="page-section-wrapper">
              {matches.map(post => (
                <BookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                  edition={post.edition}
                  price={post.price}
                  status={post.inCart}
                  condition={post.condition}
                  comments={post.comments}
                />
              ))}
            </div>
            <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">New Arrivals</h2></div>
            <div className="page-section-wrapper">
              {
                this.state.loading &&
                <div className="loading" />
              }
              {posts.map(post => (
                <BookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                  edition={post.edition}
                  status={post.status}
                  price={post.price}
                  condition={post.condition}
                  comments={post.comments}
                />
              ))}
            </div>
            <div>
              <h3>
                The book you are looking for is not here yet? <br />
                Request it below and we will let you know when someone posted it.
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
