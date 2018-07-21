/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import CartBookPost from '../../components/CartBookPost/CartBookPost';

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

    FetchService.GET(`/api/auth/getCartItems/${AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this._updateItems(data);
      });

  }

  _updateItems(data) {
    this.setState({ items: data });
  }

  buyBooks() {
    const AUTH = new AuthService();
    FetchService.POST(`/api/books/clickBuyTemp/${AUTH.getToken()}`,{
      cart: this.state.items,

    });
    console.log('BUYING BOOKS');
  }

  render() {

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
                <CartBookPost
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

            <h3>
              When you click buy book(s), we will Venmo request you once we recieve the books and validate their condition.
              Until you accept our venmo request, we will hold the book(s). However, once you accept it, the book(s) will be
              delivered via the campus mail center.
            </h3>
            <button className="button" onClick={this.buyBooks.bind(this)}>Buy Book(s)</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
