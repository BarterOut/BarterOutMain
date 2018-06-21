
import React, { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      university: '',
    };
  }

  render() {
    return (
      <div>
        <div>
          <h3>Name</h3>
          <h3>University</h3>
        </div>
        <div>
          <a href='/dashboard/home'></a>
          <a href='/dashboard/transactions'></a>
          <a href='/dashboard/analytics'></a>
          <a href='/dashboard/users'></a>
          <a href='/dashboard/settings'></a>
          <a href='/dashboard/help'></a>
        </div>
      </div>
    );
  }
}

export default Home;