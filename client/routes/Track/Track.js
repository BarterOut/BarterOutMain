/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import TrackBookPost from '../../components/TrackBookPost/TrackBookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Track extends Component {
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
    FetchService.POST('/api/user/getPurchasedBooks', {
      token: this.auth.getToken(),
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({ booksPurchased: data });
      });
  }

  getSoldBooks() {
    FetchService.POST('/api/user/getSoldBooks', {
      token: this.auth.getToken(),
    })
      .then(response => response.json())
      .then((data) => {
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
              <h2 className="title-text--page-section-header">Purchased</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.booksPurchased.map(post => (
                <TrackBookPost
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

            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Sold</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.booksSold.map(post => (
                <TrackBookPost
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

export default Track;
