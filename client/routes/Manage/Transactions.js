/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import SideNav from '../../components/SideNav/SideNav';
import TrackBookPost from '../../components/Posts/TrackBookPost/TrackBookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Transactions extends Component {
  constructor() {
    super();

    this.state = {
      booksSold: [],
      booksPurchased: [],
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.getPurchasedBooks();
    this.getSoldBooks();
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
        <NavBar page="manage" />
        <div className="container">
          <div className="row mx-auto mt-4">
            <div className="col-sm-3">
              <SideNav />
            </div>
            <div className="col-sm-6">
              <div>
                <h3>Transactions</h3>
              </div>
              <div className="scroll-posts">
                {
                  this.state.loading &&
                  <div className="loading" />
                }
                {this.state.booksPurchased.map(post => (
                  <TrackBookPost
                    key={post._id}
                    id={post._id}
                    name={post.name}
                    date={post.date}
                    type="PURCHASED"
                    subject={post.course}
                    edition={post.edition}
                    inCart={post.inCart}
                    price={post.price}
                    status={post.status}
                    condition={post.condition}
                    comments={post.comments}
                  />
                ))}
                {this.state.booksSold.map(post => (
                  <TrackBookPost
                    key={post._id}
                    id={post._id}
                    name={post.name}
                    date={post.date}
                    type="SOLD"
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
              <h3>Your Stats</h3>
              <div className="list-group">
                <div className="list-group-item list-group-item-action">
                  ${this.state.moneyMade} Made
                </div>
                <div className="list-group-item list-group-item-action">
                  {this.state.numberOfBooksBought} Book(s) Bought
                </div>
                <div className="list-group-item list-group-item-action">
                  {this.state.numberOfBooksSold} Book(s) Sold
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transactions;
