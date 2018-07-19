/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import BookPost from '../../components/BookPost/BookPost';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const AUTH = new AuthService();

    FetchService.GET(`/api/auth/getCartItems/${AUTH.getToken()}`, {})
      .then(response => response.json())
      .then((data) => {
        this._updateItems(data);
      });
  }

  _updateItems(data) {
    this.setState({ items: data });
  }

  render() {
    let items = [];
    if (this.state.items) {
      items = this.state.items;
    }
    return (
      <div className="app-wrapper">
        <SideNav
          selected="home"
        />

        <div className="right-content">
          <TopBar />
          <div className="page-content">
            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Cart</h2>
            </div>
            <div className="page-section-wrapper">
              {this.state.items.map(post => (
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
        </div>
      </div>
    );
  }
}

export default Cart;
