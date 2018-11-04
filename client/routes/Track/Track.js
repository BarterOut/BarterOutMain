/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import TrackBookPost from '../../components/TrackBookPost/TrackBookPost';
import RequestBookPost from '../../components/RequestBookPost/RequestBookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Track extends Component {
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
      .then(response => response.json())
      .then((data) => {
        this.setState({ booksRequested: data });
      });
  }

  getPurchasedBooks() {
    FetchService.GET(`/api/user/getPurchasedBooks/${this.auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date < b.date) {
            return 1;
          }
          return 0;
        });
        this.setState({ booksPurchased: data });
      });
  }

  getSoldBooks() {
    FetchService.GET(`/api/user/getSoldBooks/${this.auth.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date < b.date) {
            return 1;
          }
          return 0;
        });
        this.setState({ booksSold: data });
      });
  }

  render() {
    return (
      <div className="app-wrapper">
        <SideNav
          selected="track"
        />

        <div className="right-content">
          <TopBar page="Track" />
          <div className="page-content">
            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Your Transaction History</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.booksSold.map(post => (
                <TrackBookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                  date={post.date}
                  price={post.price}
                  condition={post.condition}
                  comments={post.comments}
                  type="SOLD"
                />
              ))}
              {this.state.booksPurchased.map(post => (
                <TrackBookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                  date={post.date}
                  price={post.price}
                  condition={post.condition}
                  comments={post.comments}
                  type="PURCHASED"
                />
              ))}
            </div>

            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Requested</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.booksRequested.map(post => (
                <RequestBookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  subject={post.course}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Track;
