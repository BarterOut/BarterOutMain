import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'
import styles from './Home.css';

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

  render() {
    return (
      <div className="app-wrapper">
        <h1>Barter Out</h1>
        <h2>Profile</h2>
        <h4>Sell Book</h4>
        <h4>Buy Book</h4>
        <h2>Your Matches</h2>
        <h2>Recent Posts</h2>
        <div>
        </div>
      </div>
    )
  }
}

export default Home;