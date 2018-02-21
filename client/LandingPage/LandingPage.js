import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './landingpage.css';

const LandingPage = () => {
    return (
        <div className="app">
            <div className="welcome">
                <h1>This is the text to have here.</h1>
            </div>
        </div>
    )
}


export default LandingPage;