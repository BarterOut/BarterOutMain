/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      fee: fee.toFixed(2),
      total: (subtotal + fee).toFixed(2),
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
                <div className="cart-money-info" key={post._id}>{post.name}: <i>${post.price}</i></div>
              ))}
              <br />
              <br />
              <span className="cart-money-info">Subtotal: <b>${this._calculateMoney().subtotal}</b></span><br />
              <br />
              <span className="cart-money-info">Our 5% Fee: <i>${this._calculateMoney().fee}</i></span><br />
              <span className="cart-money-info">Total: <b>${this._calculateMoney().total}</b></span><br />
            </div>

            <h3 id="cart-message">
              When you click &quot;Checkout&quot;, we will Venmo request @<b>{this.state.venmo}</b>.
              Please change your Venmo username <Link to="/settings" href="settings">here</Link> if it
              is not accurate. Until you accept our Venmo request, we will hold the book(s).
              Once you pay, the book(s) will be delivered via the campus mail center to
              CMC Box <b>{this.state.CMC}</b>. Again if any of this information is not accurate, please
              change it <Link to="/settings" href="settings">here</Link>.
            </h3>
            <button className="button" onClick={this.buyBooks}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
