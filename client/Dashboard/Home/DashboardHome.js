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
      onGoingTransactions: [],
      recievedTransactions: [],
      redirect: false,
      generalStatistics: {},
    };

    this.AUTH = new AuthService();
    this.confirm = this.confirm.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.logout = this.logout.bind(this);

    this.getBooksSold = this.getBooksSold.bind(this);
    this.getMoneyMade = this.getMoneyMade.bind(this);
    this.getTotalTransacted = this.getTotalTransacted.bind(this);
  }

  componentDidMount() {
    this._getAllUsers();
    // this._getPurchasedBooks();
    this._getOnGoingTransactions();
    // this._getRecievedTransactions();
    // this._getGeneralStatistics();
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
    return sum * 1.05;
  }

  _getGeneralStatistics() {
    FetchService.GET(`/api/dashboard/getStatistics/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ generalStatistics: data });
      });
  }

  _getAllUsers() {
    FetchService.GET(`/api/dashboard/getUsers/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  _getPurchasedBooks() {
    FetchService.GET(`/api/dashboard/getBooksStatus3/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ purchasedBooks: data });
      });
  }

  _getOnGoingTransactions() {
    FetchService.GET(`/api/dashboard/getBooksStatus1/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        FetchService.POST('/api/dashboard/extendBookInfo', {
          token: this.AUTH.getToken(),
          books: data,
        })
          .then(response => response.json())
          .then((fullData) => {
            console.log(fullData);
            // this.setState({ onGoingTransactions: data });
          });
      });
  }

  _getRecievedTransactions() {
    FetchService.GET(`/api/dashboard/getBooksStatus2/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ recievedTransactions: data });
      });
  }

  confirm(evt) {
    const id = evt.target.id;
    FetchService.POST('/api/dashboard/confirmBook', { id, token: this.AUTH.getToken() })
      .then(() => this._getRecievedTransactions());
  }

  confirmPayment(evt) {
    const id = evt.target.id;
    FetchService.POST('/api/dashboard/setBookPaid', { id, token: this.AUTH.getToken() })
      .then(() => {
        this._getPurchasedBooks();
        this._getRecievedTransactions();
      });
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
        <h1 className="dashboard-header">BarterOut Admin Dashboard</h1>
        <h2 className="dashboard-header">Ongoing Transactions</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">Book Name</th>
              <th className="has-border">Course Code</th>
              <th className="has-border">Owner</th>
              <th className="has-border">Charge Buyer</th>
              <th className="has-border">Pay Seller</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Buyer</th>
              <th className="has-border">Confirm</th>
            </tr>
            {this.state.onGoingTransactions.map(book => (
              <tr key={book._id} id={book._id}>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.owner}</td>
                <td className="has-border">${book.price * 1.05}</td>
                <td className="has-border">${book.price}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyer}</td>
                <td className="has-border"><button id={book._id} className="button" onClick={this.confirm}>Confirm</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="dashboard-header">Stage-2 Transactions</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">Book Name</th>
              <th className="has-border">Course Code</th>
              <th className="has-border">Owner</th>
              <th className="has-border">List Price</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Buyer</th>
              <th className="has-border">Confirm Payment</th>
            </tr>
            {this.state.recievedTransactions.map(book => (
              <tr key={book._id} id={book._id}>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.owner}</td>
                <td className="has-border">${book.price}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyer}</td>
                <td className="has-border">
                  <button id={book._id} className="button" onClick={this.confirmPayment}>Confirm Payment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="dashboard-header">Completed Transactions</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border">Book Name</th>
              <th className="has-border">Course Code</th>
              <th className="has-border">Owner</th>
              <th className="has-border">List Price</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Buyer</th>
            </tr>
            {this.state.purchasedBooks.map(book => (
              <tr key={book._id} id={book._id}>
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
        <h2 className="dashboard-header">Statistics</h2>
        <table className="dash-table">
          <tbody>
            <tr>
              <th className="has-border"># Books</th>
              <th className="has-border"># Users</th>
              <th className="has-border">Books Sold</th>
              <th className="has-border">Total Money Transacted</th>
              <th className="has-border">Money Made</th>
            </tr>
            <tr>
              <td className="has-border">{this.state.generalStatistics.totalBooks}</td>
              <td className="has-border">{this.state.generalStatistics.totalUsers}</td>
              <td className="has-border">{this.getBooksSold()}</td>
              <td className="has-border">${this.getTotalTransacted()}</td>
              <td className="has-border">${this.getMoneyMade()}</td>
            </tr>
          </tbody>
        </table>
        <h2 className="dashboard-header">Users</h2>
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
              <tr key={user._id} id={user._id}>
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
