/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import CartBookPost from '../../components/Posts/CartBookPost/CartBookPost';

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

    FetchService.GET('/api/user/getCartItems')
      .then((data) => {
        this._updateItems(data);
      });
  }

  getUserData() {
    FetchService.GET('/api/user/getUserData')
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
      subtotal: subtotal.toFixed(2),
      fee: fee.toFixed(2),
      total: (subtotal + fee).toFixed(2),
    };
  }

  buyBooks() {
    FetchService.POST('/api/books/checkoutCart', {
      cart: this.state.items,
    })
      .then(() => {
        window.alert('Order placed. See email for more details.'); // eslint-disable-line
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        <NavBar page="cart" />
        <div className="container my-4">
          <div className="row">
            <div className="col-sm-7">
              <h3>Cart</h3>
              {this.state.items.map(post => (
                <CartBookPost
                  key={post._id}
                  id={post._id}
                  name={post.name}
                  date={post.date}
                  subject={post.course}
                  edition={post.edition}
                  price={post.price}
                  condition={post.condition}
                  comments={post.comments}
                />
              ))}
            </div>
            <div className="col-sm-5">
              <h3>Summary</h3>
              <div className="card px-4 py-4">
                <span className="cart-money-info">Subtotal: <b>${this._calculateMoney().subtotal}</b></span>
                <span>Our 5% Fee: <i>${this._calculateMoney().fee}</i></span>
                <br />
                <span className="cart-money-info">Total: <b>${this._calculateMoney().total}</b></span>
                <p className="my-2">
                  When you click &quot;Checkout&quot;, we will Venmo request
                  @<b>{this.state.venmo}</b>. Please change your Venmo username
                  <Link to="/settings" href="settings"> here</Link> if it is not accurate.
                  Until you accept our Venmo request, we will hold the book(s).
                  Once you pay, the book(s) will be delivered via the campus mail center to
                  CMC Box <b>{this.state.CMC}</b>. Again if any of this information is not
                  accurate, please change it <Link to="/settings" href="settings">here</Link>.
                </p>
                <button type="button" className="btn btn-primary float-right my-2" onClick={this.buyBooks}>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
