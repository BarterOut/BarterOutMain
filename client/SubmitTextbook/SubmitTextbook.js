import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './SubmitTextbook.css';

const SubmitTextbook = () => {
  return (
    <div className="wrapper">
      <form method="POST" action="/postBook">
        <input placeholder="Name" type="text" name="name" required />
        <input placeholder="Edition" type="text" name="edition" required />
        <input placeholder="Subject" type="text" name="subject" required />
        <input placeholder="Course Number" type="number" name="courseNumber" required />
        <input placeholder="Price" type="number" name="price" required />
        <input placeholder="ISBN" type="number" name="ISBN" />
        <input placeholder="Condition" type="text" name="condition" required />
        <input placeholder="Comments" type="text" name="comments" />
      </form>
    </div>
  )
}


export default SubmitTextbook;