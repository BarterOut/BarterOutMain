import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

class SignUp extends Component {
  render() {
    return (
      <div>
        <h1>Sign up for BarterOut</h1>
        <form className="inputs" method="POST" action="/api/postBook">
        <input className="inputForLogin" placeholder="Email" type="email" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$" name="email" required />
          <input className="inputForLogin" placeholder="Password" type="password" name="password" required />
          <input className="inputForLogin" placeholder="Confirm Password" type="password" name="password" required />
          <button className="button" type="submit">SignUp</button>
        </form>
      </div>
    )
  }
}

export default SignUp;