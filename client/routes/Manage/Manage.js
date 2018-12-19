/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav/SideNav';
import PersonalBookPost from '../../components/Posts/PersonalBookPost/PersonalBookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Manage extends Component {
  constructor() {
    super();

    this.state = {
      booksSold: [],
      booksPurchased: [],
      booksRequested: [],
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.getPurchasedBooks();
    this.getSoldBooks();
    this.getRequestedBooks();
  }

  getRequestedBooks() {
    FetchService.GET(`/api/user/getRequests/${this.auth.getToken()}`)
      .then((data) => {
        this.setState({ booksRequested: data });
      });
  }

  getPurchasedBooks() {
    FetchService.GET(`/api/user/getPurchasedBooks/${this.auth.getToken()}`)
      .then((data) => {
        data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        });
        this.setState({ booksPurchased: data });
      });
  }

  getSoldBooks() {
    FetchService.GET(`/api/user/getSoldBooks/${this.auth.getToken()}`)
      .then((data) => {
        data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        });
        this.setState({ booksSold: data });
      });
  }

  render() {
    return (
      <div >
        <NavBar />
        <div className="container">
          <div className="row mx-auto mt-4">
            <div className="col-sm-3">
              <SideNav />
            </div>
            <div className="col-sm-6">
              <div>
                <h2>Your Posts</h2>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Query..."
                  onChange={this.updateInputValue}
                />
              </div>
              <div>
                {
                  this.state.loading &&
                  <div className="loading" />
                }
                {this.state.booksSold.map(post => (
                  <PersonalBookPost
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
                <h2>You&apos;ve Requested</h2>
              </div>
              <div>
                {
                  this.state.loading &&
                  <div className="loading" />
                }
                {this.state.booksSold.map(post => (
                  <PersonalBookPost
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

export default Manage;
