/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';

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
    };

    this.AUTH = new AuthService();
    this.confirm = this.confirm.bind(this);
  }

  componentDidMount() {
    this._getAllUsers();
    this._getPurchasedBooks();
    this._getTransactions();
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
    FetchService.POST('/api/dashboard/confirmBook', { id })
      .then(() => window.location.reload());
  }

  render() {
    return (
      <div>
        <h1>Welcome to Dashboard</h1>
        <button>Logout</button>

        <h2>On-going transactions</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Owner</th>
            <th>Condition</th>
            <th>Buyer</th>
            <th>Confirm</th>
          </tr>
          {this.state.transactions.map(book => (
            <tr id={book._id}>
              <td>{book._id}</td>
              <td>{book.name}</td>
              <td>{book.course}</td>
              <td>{book.owner}</td>
              <td>{book.condition}</td>
              <td>{book.buyer}</td>
              <td><button id={book._id} onClick={this.confirm}>Confirm Purchase</button></td>
            </tr>
          ))}
        </table>
        <h2>Completed Transactions</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Owner</th>
            <th>Condition</th>
            <th>Buyer</th>
          </tr>
          {this.state.purchasedBooks.map(book => (
            <tr id={book._id}>
              <td>{book._id}</td>
              <td>{book.name}</td>
              <td>{book.course}</td>
              <td>{book.owner}</td>
              <td>{book.condition}</td>
              <td>{book.buyer}</td>
            </tr>
          ))}
        </table>
        <h2>Users</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Venmo</th>
            <th>CMC</th>
            <th># Sold</th>
            <th># Bought</th>
          </tr>
          {this.state.users.map(user => (
            <tr id={user._id}>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.emailAddress}</td>
              <td>{user.venmoUsername}</td>
              <td>{user.CMC}</td>
              <td>{user.numberOfBooksSold}</td>
              <td>{user.numberOfBooksBought}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default DashboardHome;
