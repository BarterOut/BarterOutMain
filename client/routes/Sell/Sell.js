/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import BookPost from '../../components/BookPost/BookPost';
import BuyBook from '../../components/BuyBook/BuyBook';
import SellBook from '../../components/SellBook/SellBook';

class Sell extends Component {
  constructor() {
    super();
    this.state = {
      buyHidden: true,
      sellHidden: true,
      posts: [],
    };
  }

  componentDidMount() {
    const AUTH = new AuthService();
    FetchService.GET(`/api/books/getUsersPosts/${AUTH.getToken()}`, {})
      .then(response => response.json())
      .then((data) => {
        this.setState({ posts: data });
      });
  }

  toggleBuyVisibility() {
    this.setState({ buyHidden: !this.state.buyHidden });
  }

  toggleSellVisibility() {
    this.setState({ sellHidden: !this.state.sellHidden });
  }

  render() {
    let posts = [];
    if (this.state.posts) {
      posts = this.state.posts;
    }
    return (
      <div className="app-wrapper">
        <SideNav
          selected="sell"
        />

        <div className="right-content">
          <TopBar />
          <div className="page-content">
            <div className="page-section-wrapper">
              <div className="title--page-section-wrapper">
                <h2 className="title-text--page-section-header">Sell Your Textbooks</h2>
              </div>
              Have textbooks you don&apos;t need anymore?
              Sell them now and make some extra $$$
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

            <div className="page-section-wrapper">
              <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">Your Books</h2></div>
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
    );
  }
}

export default Sell;
