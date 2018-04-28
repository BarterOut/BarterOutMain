import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'
import styles from './Home.css';

import BookPost from './BookPost/BookPost';
import BuyBook from './BuyBook/BuyBook';
import SellBook from './SellBook/SellBook';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      posts: [],
      user: {}
    }
  }

 componentDidMount() {
    this.setState({'user': JSON.parse(sessionStorage.getItem('user'))});
    this.callApi('/api/displayAllBooks')
      .then(res => {
        console.log(res);
        this.setState({posts: res});
      })
      .catch(err => console.log(err));
  }

  async callApi (url) {
    const response = await fetch(url);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  logout () {
    sessionStorage.clear();
    window.location.reload();
  }

  updateInputValue(evt) {
    this.search(evt.target.value);
  }

  search(query) {
    if (query == '') {
      this.callApi(`/api/displayAllBooks`)
      .then(res => {
        this.setState({ posts: res });
      })
      .catch(err => console.log(err));
      return;
    }
    this.callApi(`/api/searchBook/${query}`)
      .then(res => {
        this.setState({ posts: res });
      })
      .catch(err => console.log(err));
  }

  render() {
    let posts = [];
    let user = {};
    if (this.state) {
      posts = this.state.posts;
      user = this.state.user;
    }
    return (
      <div className="app-wrapper">
        <h1>Barter Out</h1>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <h2>Profile</h2>
        <h4>ID: {user._id}</h4>
        <h4>EMAIL: {user.emailAddress}</h4>
        <h4>VENMO: {user.venmoUsername}</h4>
        <h4>CMC: {user.CMC}</h4>
        {/* <h4>Sell Book</h4> */}
        <SellBook></SellBook>
        {/* <h4>Buy Book</h4> */}
        <BuyBook></BuyBook>
        <h2>Your Matches</h2>
        <h2>Recent Posts</h2>
        <input autocomplete="off" className="inputForTextbook" onChange={this.updateInputValue.bind(this)}placeholder="Search Books (basic)" type="text" name="name" />
        <button onClick={this.search.bind(this)}>Search</button>
        <div>
        {posts.map(post => (
            <BookPost
              key={post._id}
              name={post.name}
              subject={post.course}
              edition={post.edition}
              courseNumber={post.courseNumber}
              price={post.price}
              ISBN={post.ISBN}
              condition={post.condition}
              owner={post.owner}
              comments={post.comments}>
            </BookPost>
          ))}
        </div>
      </div>
    )
  }
}

export default Home;