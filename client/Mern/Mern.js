import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './mern.css';

const Mern = () => {
  return (
    <div className="app">
      <div className="welcome">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/mern">Mern</Link>
        <h1>MERN</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora obcaecati, impedit iste! Quia necessitatibus quidem atque, molestiae recusandae voluptatibus nostrum nihil illum ullam nesciunt alias eligendi eius neque ipsum provident!</p>
        <img src={require('../images/node.png')} className="image" />
      </div>
    </div>
  )
}


export default Mern;