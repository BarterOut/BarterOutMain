/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';

import NavBar from '../../components/NavBar/NavBar';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

class Manage extends Component {
  constructor() {
    super();

    this.state = {
      booksSold: [],
      booksPurchased: [],
      booksRequested: [],
    };
    this.auth = new AuthService();
  }

  componentDidMount() {
    this.getPurchasedBooks();
    this.getSoldBooks();
    this.getRequestedBooks();
  }

  getRequestedBooks() {
    FetchService.GET(`/api/user/getRequests/${this.auth.getToken()}`)
      .then((data) => {
        this.setState({ booksRequested: data });
      });
  }

  getPurchasedBooks() {
    FetchService.GET(`/api/user/getPurchasedBooks/${this.auth.getToken()}`)
      .then((data) => {
        data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        });
        this.setState({ booksPurchased: data });
      });
  }

  getSoldBooks() {
    FetchService.GET(`/api/user/getSoldBooks/${this.auth.getToken()}`)
      .then((data) => {
        data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          return 0;
        });
        this.setState({ booksSold: data });
      });
  }

  render() {
    return (
      <div >
        <NavBar />
      </div>
    );
  }
}

export default Manage;
