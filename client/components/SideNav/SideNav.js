/**
 * @file Reusable React component for the side nav of the website.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SellBook from '../SellBook/SellBook';
import RequestBook from '../RequestBook/RequestBook';

class SideNav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="sidenav">
        <h5 className="my-2">Have a book to sell?</h5>
        <button
          className="btn btn-secondary my-1"
          data-toggle="modal"
          data-target="#sellBookModal"
        >Post Your Book
        </button>
        <div className="modal fade" id="sellBookModal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Sell Book</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <SellBook />
              </div>
            </div>
          </div>
        </div>
        <h5 className="my-2">Not finding a book?</h5>
        <button
          className="btn btn-secondary my-1"
          data-toggle="modal"
          data-target="#requestBookModal"
        >Request a Book
        </button>
        <h4 className="my-2">
        Manage<span className="badge badge-info mx-2">Beta</span>
        </h4>
        <div className="list-group">
          <Link className="list-group-item list-group-item-action" href="/manage/posts" to="/manage/posts">Posts</Link>
          <Link className="list-group-item list-group-item-action" href="/manage/transactions" to="/manage/transactions">Transactions</Link>
        </div>
        <div className="modal fade" id="requestBookModal" tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Request Book</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <RequestBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNav;
