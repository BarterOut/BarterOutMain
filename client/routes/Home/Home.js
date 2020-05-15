/**
 * @file Home.js
 * @description Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav/SideNav';
import BookPost from '../../components/Posts/BookPost/BookPost';

import FetchService from '../../services/FetchService';
import ErrorService from '../../services/ErrorService';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      matches: [],
      notifications: [],
      numberOfBooksBought: 0,
      numberOfBooksSold: 0,
      moneyMade: 0,
      loading: false,
    };

    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    // Prioritize what we fetch first
    this.getAllBooks();
    this.getUserMatches();
    this.getUserNotifications();
    this.getUserStatistics();
  }

  getAllBooks() {
    this.setState({ loading: true });
    FetchService.GET('/api/books/getAllBooks/')
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      });
  }

  getUserNotifications() {
    FetchService.GET('/api/user/getNotifications')
    .then((data) => {
      this.setState({ notifications: data })
    });
  }

  getUserStatistics() {
    FetchService.GET('/api/user/getUserStatistics')
      .then((data) => {
        this.setState({ numberOfBooksBought: data.numberOfBooksBought });
        this.setState({ numberOfBooksSold: data.numberOfBooksSold });
        this.setState({ moneyMade: data.moneyMade });
      });
  }

  getUserMatches() {
    FetchService.GET('/api/books/getUserMatches')
      .then((data) => {
        this.setState({ matches: data });
      });
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    this.setState({ loading: true });
    this.setState({ posts: [] });
    if (query === '') {
      FetchService.GET('/api/books/getAllBooks')
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ posts: data });
        })
        .catch(err => ErrorService.parseError(err));
      return;
    }

    FetchService.GET(`/api/books/search/${query}`)
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(err => ErrorService.parseError(err));
  }

  render() {
    return (
      <div>
        <NavBar page="home" />
        <div className="container">
          <div className="row mx-auto mt-4">
            <div className="col-sm-3">
              <SideNav />
            </div>
            <div className="col-sm-6">
              <div>
                <h3>Your Matches</h3>
              </div>
              <div className="scroll-posts--sm">
                {this.state.matches.map(post => (
                  <BookPost
                    key={post._id}
                    id={post._id}
                    name={post.name}
                    date={post.date}
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
                <h3>Recent Posts</h3>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search..."
                  onChange={this.updateInputValue}
                />
              </div>
              <div className="scroll-posts--lg">
                {
                  this.state.loading
                  && <div className="loading" />
                }
                {this.state.posts.map(post => (
                  <BookPost
                    key={post._id}
                    id={post._id}
                    name={post.name}
                    date={post.date}
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
            </div>
            <div className="col-sm-3">
              <h4>
                Stats
              </h4>
              <div className="list-group">
                <span className="list-group-item list-group-item-action">
                  $
                  {this.state.moneyMade}
                  &nbsp;Made
                </span>
                <span className="list-group-item list-group-item-action">
                  {this.state.numberOfBooksBought}
                  &nbsp;Book(s) Bought
                </span>
                <span className="list-group-item list-group-item-action">
                  {this.state.numberOfBooksSold}
                  &nbsp;Book(s) Sold
                </span>
              </div>
              <br />
              <h4>
                Notifications
              </h4>
              <div class="list-group notifications">
                {this.state.notifications.map(notif => (
                  <div class="list-group-item list-group-item-action">
                    <p class="mb-1">{notif.message}</p>
                    <small>{notif.date}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
