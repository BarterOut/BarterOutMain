/**
 * @file DashboardHome.js
 * @description Main React component for the admin dashboard.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
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
    this.deactivateBooks = this.deactivateBooks.bind(this);
  }

  componentDidMount() {
    this._getAllUsers();
    this._getOnGoingTransactions();
    this._getRecievedTransactions();
    this._getPurchasedBooks();
    this._getGeneralStatistics();
  }

  getBooksSold() {
    return this.state.purchasedBooks.length;
  }

  getMoneyMade() {
    let sum = 0;
    this.state.purchasedBooks.forEach((book) => {
      sum += book.price;
    });
    return (sum * 0.05).toFixed(2);
  }

  getTotalTransacted() {
    let sum = 0;
    this.state.purchasedBooks.forEach((book) => {
      sum += book.price;
    });
    return (sum * 1.05).toFixed(2);
  }

  _getGeneralStatistics() {
    FetchService.GET('/api/dashboard/getStatistics')
      .then((data) => {
        this.setState({ generalStatistics: data });
      });
  }

  _getAllUsers() {
    FetchService.GET('/api/dashboard/getUsers')
      .then((data) => {
        this.setState({ users: data });
      });
  }

  _getSpecificUser(event){
    let keyCode = event.keyCode || event.which;
    if(keyCode === 13){
      const value = event.target.value;
      if(value){
        FetchService.GET("/api/dashboard/getSpecificUser/?email=" + event.target.value)
          .then((data) => {
            this.setState({ users: data});
          });
      } else{
        this._getAllUsers();
      }
    }
  }
  _getPurchasedBooks() {
    FetchService.GET('/api/dashboard/getBooksWithStatus/3')
      .then((data) => {
        FetchService.POST('/api/dashboard/extendBookInfo', {
          books: data,
        })
          .then((fullData) => {
            this.setState({ purchasedBooks: fullData });
          });
      });
  }

  _getOnGoingTransactions() {
    FetchService.GET('/api/dashboard/getBooksWithStatus/1')
      .then((data) => {
        FetchService.POST('/api/dashboard/extendBookInfo', {
          books: data,
        })
          .then((fullData) => {
            this.setState({ onGoingTransactions: fullData });
          });
      });
  }

  _getRecievedTransactions() {
    FetchService.GET('/api/dashboard/getBooksWithStatus/2')
      .then((data) => {
        FetchService.POST('/api/dashboard/extendBookInfo', {
          books: data,
        })
          .then((fullData) => {
            this.setState({ recievedTransactions: fullData });
          });
      });
  }

  confirm(evt) {
    const { target: { id } } = evt;
    FetchService.POST('/api/dashboard/confirmBook', { id })
      .then(() => window.location.reload());
  }

  deactivateBooks() {
    FetchService.POST('/api/dashboard/deactivateBooks', {})
      .then(() => {
        window.alert('Success'); // eslint-disable-line
      });
  }

  makeAdmin(evt) {
    const userID = evt.target.id;
    FetchService.PUT('/api/dashboard/makeAdmin', { userID })
      .then(() => {
        window.alert('Success'); // eslint-disable-line
      });
  }

  confirmPayment(evt) {
    const { target: { id } } = evt;
    FetchService.POST('/api/dashboard/setBookPaid', { id })
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
      <div className="dash-wrap">
        <h3 className="my-2 mx-2">BarterOut Admin Dashboard</h3>
        <h3 className="mt-4 mx-2">Transactions - Verify Condition &amp; Charge Buyer</h3>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th className="has-border">Book Name</th>
              <th className="has-border">Course Code</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Seller</th>
              <th className="has-border">Buyer</th>
              <th className="has-border">Charge (Buyer) Amount</th>
              <th className="has-border">Confirm</th>
            </tr>
            {this.state.onGoingTransactions.map(book => (
              <tr key={book._id} id={book._id}>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border"><b>{book.condition}</b></td>
                <td className="has-border">@{book.ownerObject.venmoUsername}</td>
                <td className="has-border">@{book.buyerObject.venmoUsername}</td>
                <td className="has-border">${(book.price * 1.05).toFixed(2)}</td>
                <td className="has-border"><button type="button" id={book._id} className="btn btn-primary" onClick={this.confirm}>Confirm</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-4 mx-2">Transactions - Pay Seller</h3>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th className="has-border">Book Name</th>
              <th className="has-border">Course Code</th>
              <th className="has-border">Condition</th>
              <th className="has-border">Seller</th>
              <th className="has-border">Buyer</th>
              <th className="has-border">Pay (Seller) Amount</th>
              <th className="has-border">Confirm</th>
            </tr>
            {this.state.recievedTransactions.map(book => (
              <tr key={book._id} id={book._id}>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">@{book.ownerObject.venmoUsername}</td>
                <td className="has-border">@{book.buyerObject.venmoUsername}</td>
                <td className="has-border">${book.price}</td>
                <td className="has-border"><button type="button" id={book._id} className="btn btn-primary" onClick={this.confirmPayment}>Confirm</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mt-4 mx-2">Completed Transactions</h3>
        <table className="table table-striped">
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
                <td className="has-border">{book.ownerObject.firstName} {book.ownerObject.lastName}</td>
                <td className="has-border">${book.price}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyerObject.firstName} {book.buyerObject.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-4 mx-2">Admin Tools</h3>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th className="has-border">Tool</th>
              <th className="has-border">Run</th>
            </tr>
            <tr>
              <td className="has-border">Deactivate Old Books</td>
              <td className="has-border"><button type="button" className="btn btn-primary" onClick={this.deactivateBooks}>Run</button></td>
            </tr>
          </tbody>
        </table>
        <h3 className="mt-4 mx-2">Statistics</h3>
        <table className="table table-striped">
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
        <h3 className="mt-4 mx-2">Users</h3>
        <input
            type="text" 
            defaultValue= "enter an email to search by" 
            onKeyPress ={this._getSpecificUser.bind(this)}
         />
        <table className="table table-striped">
          <tbody>
            <tr>
              {/* <th className="has-border">ID</th> */}
              <th className="has-border">First Name</th>
              <th className="has-border">Last Name</th>
              <th className="has-border">Email</th>
              {/* <th className="has-border">Venmo</th> */}
              {/* <th className="has-border">CMC</th> */}
              <th className="has-border"># Sold</th>
              <th className="has-border"># Bought</th>
              <th className="has-border">Admin</th>
            </tr>
            {this.state.users.map(user => (
              <tr key={user._id} id={user._id}>
                {/* <td className="has-border">{user._id}</td> */}
                <td className="has-border">{user.firstName}</td>
                <td className="has-border">{user.lastName}</td>
                <td className="has-border">{user.emailAddress}</td>
                {/* <td className="has-border">{user.venmoUsername}</td> */}
                {/* <td className="has-border">{user.CMC}</td> */}
                <td className="has-border">{user.numberOfBooksSold}</td>
                <td className="has-border">{user.numberOfBooksBought}</td>
                {
                  (user.permissionType > 0) && (
                    <td className="has-border">
                      <h3 className="badge badge-danger">Admin</h3>
                    </td>
                  )}
                {
                  !(user.permissionType > 0) && (
                    <td className="has-border">
                      <button type="button" id={user._id} className="btn btn-primary" onClick={this.makeAdmin}>
                      Make Admin
                      </button>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DashboardHome;
