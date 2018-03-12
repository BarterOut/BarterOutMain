import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './preRegister.css';
import regularFont from './sylesheetOrkneyRegular.css';
import animations from './animate.css';

const PreRegister = () => {
    return (
        <div className="app">
            <div className="preRegisterPage">
                <div className="container">
                    <div className="pageText animated fadeIn">
                        <h1>You've Been Pre-Registered!</h1>
                        Thank you for pre-registering with BarterOut! When the full BarterOut web app is live, we'll
                        email you a link for you to set up your full account. Be sure to check your inbox for us around
                        Summer 2018!
                        <br/>
                        <br/>
                        <a id="backLink" href="/">Click Here to Go Back to BarterOut</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PreRegister;