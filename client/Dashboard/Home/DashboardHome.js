/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import './Dashboard.css';

class DashboardHome extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      purchasedBooks: [],
      transactions: [],
      redirect: false,
    };

    this.AUTH = new AuthService();
    this.confirm = this.confirm.bind(this);
    this.logout = this.logout.bind(this);

    this.getBooksSold = this.getBooksSold.bind(this);
    this.getMoneyMade = this.getMoneyMade.bind(this);
    this.getTotalTransacted = this.getTotalTransacted.bind(this);
  }

  componentDidMount() {
    this._getAllUsers();
    this._getPurchasedBooks();
    this._getTransactions();
  }

  getBooksSold() {
    return this.state.purchasedBooks.length;
  }

  getMoneyMade() {
    let sum = 0;
    this.state.purchasedBooks.forEach((book) => {
      sum += book.price;
    });
    return sum * 0.05;
  }

  getTotalTransacted() {
    let sum = 0;
    this.state.purchasedBooks.forEach((book) => {
      sum += book.price;
    });
    return sum;
  }

  _getAllUsers() {
    FetchService.GET(`/api/dashboard/getUsers/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  _getPurchasedBooks() {
    FetchService.GET(`/api/dashboard/getPurchasedBooks/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ purchasedBooks: data });
      });
  }

  _getTransactions() {
    FetchService.GET(`/api/dashboard/getTransactions/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ transactions: data });
      });
  }

  confirm(evt) {
    const id = evt.target.id;
    FetchService.POST('/api/dashboard/confirmBook', { id, token: this.AUTH.getToken() })
      .then(() => window.location.reload());
  }

  logout() {
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/home" />);
    }
    return (
      <div className="dashboard-wrapper">
        <h1>Welcome to the Dashboard</h1>
        <button className="button" onClick={this.logout}>Logout</button>

        <h2>On-Going transactions</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">ID</th>
              <th className="has-border">Name</th>
              <th className="has-border">Course</th>
              <th className="has-border">Owner</th>
              <th className="has-border">Price</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Buyer</th>
              <th className="has-border">Confirm</th>
            </tr>
            {this.state.transactions.map(book => (
              <tr id={book._id}>
                <td className="has-border">{book._id}</td>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.owner}</td>
                <td className="has-border">${book.price}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyer}</td>
                <td className="has-border"><button id={book._id} className="button" onClick={this.confirm}>Confirm Purchase</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Completed Transactions</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">ID</th>
              <th className="has-border">Name</th>
              <th className="has-border">Course</th>
              <th className="has-border">Owner</th>
              <th className="has-border">Price</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Buyer</th>
            </tr>
            {this.state.purchasedBooks.map(book => (
              <tr id={book._id}>
                <td className="has-border">{book._id}</td>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.owner}</td>
                <td className="has-border">${book.price}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Statistics</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">Books Sold</th>
              <th className="has-border">Total Money Transacted</th>
              <th className="has-border">Money Made</th>
            </tr>
            <tr>
              <td className="has-border">{this.getBooksSold()}</td>
              <td className="has-border">${this.getTotalTransacted()}</td>
              <td className="has-border">${this.getMoneyMade()}</td>

            </tr>
          </tbody>
        </table>
        <h2>Users</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">ID</th>
              <th className="has-border">First Name</th>
              <th className="has-border">Last Name</th>
              <th className="has-border">Email</th>
              <th className="has-border">Venmo</th>
              <th className="has-border">CMC</th>
              <th className="has-border"># Sold</th>
              <th className="has-border"># Bought</th>
            </tr>
            {this.state.users.map(user => (
              <tr id={user._id}>
                <td className="has-border">{user._id}</td>
                <td className="has-border">{user.firstName}</td>
                <td className="has-border">{user.lastName}</td>
                <td className="has-border">{user.emailAddress}</td>
                <td className="has-border">{user.venmoUsername}</td>
                <td className="has-border">{user.CMC}</td>
                <td className="has-border">{user.numberOfBooksSold}</td>
                <td className="has-border">{user.numberOfBooksBought}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DashboardHome;
