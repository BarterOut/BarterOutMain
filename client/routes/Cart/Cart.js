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
    this.buyBooks = this.buyBooks.bind(this);
    this._calculateMoney = this._calculateMoney.bind(this);
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
        this.setState({ venmo: data.user.venmoUsername });
        this.setState({ CMC: data.user.CMC });
      });
  }

  _updateItems(data) {
    this.setState({ items: data });
  }

  _calculateMoney() {
    let subtotal = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      subtotal += this.state.items[i].price;
    }

    const fee = subtotal * 0.05;

    return {
      subtotal,
      fee,
      total: subtotal + fee,
    };
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
        <SideNav />

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

            <div id="cart-totals">
              <b>Items:</b><br />
              {this.state.items.map(post => (
                <div key={post._id}>{post.name}: <i>${post.price}</i></div>
              ))}
              <br />
              <br />
              <span>Subtotal: <b>${this._calculateMoney().subtotal}</b></span><br />
              <br />
              <span>Our 5% Fee: <i>${this._calculateMoney().fee}</i></span><br />
              <span>Total: <b>${this._calculateMoney().total}</b></span><br />
            </div>

            <h3 id="cart-message">
              When you click &quot;Checkout&quot;, we will Venmo request @<b>{this.state.venmo}</b> once we recieve the books and validate their condition.
              Until you accept our venmo request, we will hold the book(s). However, once you accept it, the book(s) will be
              delivered via the campus mail center to the CMC Box <b>{this.state.CMC}</b>.
            </h3>
            <button className="button" onClick={this.buyBooks}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
