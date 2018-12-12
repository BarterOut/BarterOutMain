/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import ReactModal from 'react-modal';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import SideNav from '../../components/SideNav/SideNav';
import TopBar from '../../components/TopBar/TopBar';
import PersonalBookPost from '../../components/Posts/PersonalBookPost/PersonalBookPost';
import SellBook from '../../components/SellBook/SellBook';

import './Sell.css';

class Sell extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    const AUTH = new AuthService();
    FetchService.GET(`/api/books/getUsersPosts/${AUTH.getToken()}`)
      .then((data) => {
        this.setState({ posts: data });
      });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    let posts = [];
    if (this.state.posts) {
      posts = this.state.posts;
    }
    return (
      <div className="app-wrapper">
        <SideNav
          selected="sell"
        />

        <div className="right-content">
          <TopBar page="Sell" />
          <div className="page-content">
            <div className="title--page-section-wrapper">
              <h2 className="title-text--page-section-header">Sell your Textbooks</h2>
            </div>
            <div className="page-section-wrapper">

              <div className="sellInfoSection">
                <span id="sellPromptText">
                  Have textbooks you don&apos;t need anymore?
                  Sell them now and make some extra $$$
                </span>
                <button
                  className="button sellButton"
                  onClick={this.handleOpenModal}
                >Sell Now
                </button>
              </div>
            </div>
            <div className="title--page-section-wrapper"><h2 className="title-text--page-section-header">Books You&apos;re Selling</h2></div>
            <div className="page-section-wrapper">
              {posts.map(post => (
                <PersonalBookPost
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
          </div>
          <div>
            <ReactModal
              className="modal"
              overlayClassName="overlay"
              isOpen={this.state.showModal}
              contentLabel="Sell Book Modal"
              ariaHideApp={false}
            >
              <div className="top-modal-section">
                <button className="close-modal-button" onClick={this.handleCloseModal}>X</button>
              </div>
              <SellBook />
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}

export default Sell;
