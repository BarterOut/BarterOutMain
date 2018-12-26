/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav/SideNav';
import PersonalBookPost from '../../components/Posts/PersonalBookPost/PersonalBookPost';
import RequestBookPost from '../../components/Posts/RequestBookPost/RequestBookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Posts extends Component {
  constructor() {
    super();

    this.state = {
      booksPosted: [],
      booksRequested: [],
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.getRequestedBooks();
    this.getPostedBooks();
  }

  getRequestedBooks() {
    FetchService.GET(`/api/user/getRequests/${this.auth.getToken()}`)
      .then((data) => {
        this.setState({ booksRequested: data });
      });
  }

  getPostedBooks() {
    FetchService.GET(`/api/books/getUsersPosts/${this.auth.getToken()}`)
      .then((data) => {
        this.setState({ booksPosted: data });
      });
  }

  render() {
    return (
      <div >
        <NavBar page="manage" />
        <div className="container">
          <div className="row mx-auto mt-4">
            <div className="col-sm-3">
              <SideNav />
            </div>
            <div className="col-sm-6">
              <div>
                <h3>Your Posts</h3>
              </div>
              <div>
                {
                  this.state.loading &&
                  <div className="loading" />
                }
                {this.state.booksPosted.map(post => (
                  <PersonalBookPost
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
                <h3 className="mt-3">You&apos;ve Requested</h3>
              </div>
              <div>
                {
                  this.state.loading &&
                  <div className="loading" />
                }
                {this.state.booksRequested.map(post => (
                  <RequestBookPost
                    key={post._id}
                    id={post._id}
                    name={post.name}
                    date={post.date}
                    subject={post.course}
                    edition={post.edition}
                  />
                ))}
              </div>
            </div>
            <div className="col-sm-3">
              <h3>
                Your Stats<span className="badge badge-info mx-2">Beta</span>
              </h3>
              <div className="list-group">
                <div className="list-group-item list-group-item-action">
                  ${this.state.moneyMade} Made
                </div>
                <div className="list-group-item list-group-item-action">
                  {this.state.numberOfBooksBought} Books Bought
                </div>
                <div className="list-group-item list-group-item-action">
                  {this.state.numberOfBooksSold} Books Sold
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
