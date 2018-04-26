import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './Login.css';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login to BarterOut</h1>
        <form className="inputs" method="POST" action="/api/postBook">
        <input className="inputForLogin" placeholder="Email" type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$" name="email" required />
          <input className="inputForLogin" placeholder="Password" type="password" name="password" required />
          <button className="button" type="submit">Login</button>
        </form>
        <h4>Don't have an account? <Link to="/signup">Sign Up</Link></h4>
      </div>
    )
  }
}

export default Login;