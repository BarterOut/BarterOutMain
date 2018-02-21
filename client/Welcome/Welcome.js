import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './welcome.css';

const Welcome = () => {
  return (
    <div className="app">
      <div className="welcome">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/mern">Mern</Link>
          <Link className="link" to="/landingPage">LandingPage</Link>
        <h1>Welcome</h1>
      </div>
    </div>
  )
}


export default Welcome;