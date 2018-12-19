/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import './Home.css';
import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav/SideNav';
import BookPost from '../../components/Posts/BookPost/BookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';
import ErrorService from '../../services/ErrorService';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      numberOfBooksBought: 0,
      numberOfBooksSold: 0,
      moneyMade: 0,
      loading: false,
    };

    this.AUTH = new AuthService();
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  componentDidMount() {
    this.getUserStatistics();
    this.getMatches();
  }

  getMatches() {
    FetchService.GET(`/api/books/getAllBooks/${this.AUTH.getToken()}`)
      .then((data) => {
        this.setState({ posts: data });
      });
  }

  getUserStatistics() {
    FetchService.GET(`/api/user/getUserStatistics/${this.AUTH.getToken()}`)
      .then((data) => {
        this.setState({ numberOfBooksBought: data.numberOfBooksBought });
        this.setState({ numberOfBooksSold: data.numberOfBooksSold });
        this.setState({ moneyMade: data.moneyMade });
      });
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    this.setState({ loading: true });
    this.setState({ posts: [] });
    if (query === '') {
      FetchService.GET(`/api/books/getAllBooks/${this.AUTH.getToken()}`)
        .then((data) => {
          this.setState({ loading: false });
          this.setState({ posts: data });
        })
        .catch(err => ErrorService.parseError(err));
      return;
    }

    FetchService.GET(`/api/books/search/${query}/${this.AUTH.getToken()}`)
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ posts: data });
      })
      .catch(err => ErrorService.parseError(err));
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row mx-auto mt-4">
            <div className="col-sm-3">
              <SideNav />
            </div>
            <div className="col-sm-6">
              <div>
                <h2>Recent Posts</h2>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search..."
                  onChange={this.updateInputValue}
                />
              </div>
              <div>
                {
                  this.state.loading &&
                  <div className="loading" />
                }
                {this.state.posts.map(post => (
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
            </div>
            <div className="col-sm-3">
              <h2>Your Stats</h2>
              <div className="list-group">
                <a className="list-group-item list-group-item-action" href="/">
                  ${this.state.moneyMade} Made
                </a>
                <a className="list-group-item list-group-item-action" href="/">
                  {this.state.numberOfBooksBought} Books Bought
                </a>
                <a className="list-group-item list-group-item-action" href="/">
                  {this.state.numberOfBooksSold} Books Sold
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
