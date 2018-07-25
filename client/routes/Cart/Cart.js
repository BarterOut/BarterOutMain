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

import './Cart.css';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      venmo: '',
      CMC: '',
    };

    this.AUTH = new AuthService();
  }

  componentDidMount() {
    this.getUserData();

    FetchService.GET(`/api/user/getCartItems/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this._updateItems(data);
      });
  }

  getUserData() {
    FetchService.GET(`/api/user/getUserData/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ venmo: data.user.venmoUserName });
        this.setState({ CMC: data.user.CMC });
      });
  }

  _updateItems(data) {
    this.setState({ items: data });
  }

  buyBooks() {
    const AUTH = new AuthService();
    FetchService.POST(`/api/books/clickBuyTemp/${AUTH.getToken()}`, {
      cart: this.state.items,
    })
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="app-wrapper">
        <SideNav
          selected="home"
        />

        <div className="right-content">
          <TopBar page="Cart" />
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

            <p id="cart-totals">
              <b>Items:</b><br />
              <span>Principles of Calc: <i>$25</i></span><br />
              <span>Principles of Calc: <i>$25</i></span><br />
              <span>Principles of Calc: <i>$25</i></span><br />
              <br />
              <br />
              <span>Subtotal: <b>$75.00</b></span><br />
              <br />
              <span>Our 5% Fee: <i>$3.75</i></span><br />
              <span>Total: <b>$78.75</b></span><br />
            </p>

            <h3 id="cart-message">
              When you click &quot;Checkout&quot;, we will Venmo request @<b>{this.state.venmo}</b> once we recieve the books and validate their condition.
              Until you accept our venmo request, we will hold the book(s). However, once you accept it, the book(s) will be
              delivered via the campus mail center to the CMC Box <b>{this.state.CMC}</b>.
            </h3>
            <button className="button" onClick={this.buyBooks.bind(this)}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
