/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.1
 */

import React, { Component } from 'react';

import axios from 'axios';

import './Home.css';
import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';
import profile from '../images/barterOutProfilePhotoWebPage.png';

import BookPost from './BookPost/BookPost';
import BuyBook from './BuyBook/BuyBook';
import SellBook from './SellBook/SellBook';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      matches: [],
      user: JSON.parse(sessionStorage.getItem('user')),
      sellHidden: true,
      buyHidden: true,
    };
  }

  componentDidMount() {
    this.callApi('/api/books/displayAllBooks')
      .then((res) => {
        this.setState({ posts: res });
      })
      .catch(err => new Error(err));

    axios.post('/api/books/showMatches', {
      id: JSON.parse(sessionStorage.getItem('user'))._id,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({ matches: response.data });
      })
      .catch((error) => {
        console.error(`Sign up server error: ${error}`);
      });
  }

  async callApi(url) {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  toggleBuyVisibility() {
    this.setState({ buyHidden: !this.state.buyHidden });
  }

  toggleSellVisibility() {
    this.setState({ sellHidden: !this.state.sellHidden });
  }

  search(query) {
    if (query === '') {
      this.callApi('/api/books/displayAllBooks')
        .then((res) => {
          this.setState({ posts: res });
        })
        .catch(err => console.warn(err));
      return;
    }
    this.callApi(`/api/books/searchBook/${query}`)
      .then((res) => {
        this.setState({ posts: res });
      })
      .catch(err => console.warn(err));
  }

  render() {
    let posts = [];
    let matches = [];
    let user = {};
    if (this.state) {
      posts = this.state.posts;
      matches = this.state.matches;
      user = this.state.user;
    }
    return (
      <div className="app-wrapper">
        <div className="bar">
          <div className="right">
            <img className="logo" src={logoPic} alt="logo" />
          </div>
          <div className="left">
            <button
              className="button"
              onClick={this.logout.bind(this)}
            >Logout
            </button>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="profile-section">
            <img src={profile} alt="profile" className="profile-pic" />
            <h2>Profile</h2>
            <h4>{user.firstName} {user.lastName}</h4>
            <h4>{user.emailAddress}</h4>
            <h4>@{user.venmoUsername}</h4>
            <h4>CMC Box: {user.CMC}</h4>
            <button
              className="button"
              onClick={this.toggleBuyVisibility.bind(this)}
            >Find Book
            </button>
            <button
              className="button"
              onClick={this.toggleSellVisibility.bind(this)}
            >Sell Book
            </button>
          </div>

          <div className="books-lists">
            <div className="posts-section">
              <span className="header">Your Matches</span>
              <div className="posts">
                {matches.map(post => (
                  <BookPost
                    key={post._id + 1}
                    id={post._id}
                    name={post.name}
                    subject={post.course}
                    edition={post.edition}
                    price={post.price}
                    ISBN={post.ISBN}
                    condition={post.condition}
                    comments={post.comments}
                  />
                ))}
              </div>
            </div>

            <div className="posts-section">
              <div className="posts-header">
                <div className="leftPB">
                  <span className="header">New Arrivals</span>
                </div>
                <div className="rightBP">
                  <input
                    autoComplete="off"
                    className="searchInput"
                    onChange={this.updateInputValue.bind(this)}
                    placeholder="Search Books"
                    type="text"
                    name="name"
                  />
                </div>
              </div>
              <div className="posts">
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

            {!this.state.buyHidden && <BuyBook />}
            {!this.state.sellHidden && <SellBook />}

          </div>
        </div>
      </div>
    );
  }
}

export default Home;
