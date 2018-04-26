import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'
import styles from './Home.css';
import BookPost from './BookPost/BookPost';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
      posts: []
    }
  }

 componentDidMount() {
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

  render() {
    let posts = [];
    if (this.state) {
      posts = this.state.posts;
    }
    return (
      <div className="app-wrapper">
        <h1>Barter Out</h1>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <h2>Profile</h2>
        <h4>Sell Book</h4>
        <h4>Buy Book</h4>
        <h2>Your Matches</h2>
        <h2>Recent Posts</h2>
        <div>
        {posts.map(post => (
            <BookPost
              key={post._id}
              name={post.name}
              subject={post.subject}
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