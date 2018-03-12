import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './contact.css';
import regularFont from './sylesheetOrkneyRegular.css';
import boldfont from './sylesheetOrkneyBold.css';
import animations from './animate.css';

const Contact = () => {
    return (
        <div className="app">
            <div className="contactPage">
                <div className="container">
                    <div className="pageText animated fadeIn">
                        <h1>Contact</h1>
                        Shoot us a message if you have any questions about us!
                        We can be reached via the following forms of communication:
                        <br/>
                        <a href="https://www.facebook.com/BarterOut/">Facebook</a>
                        <br/>
                        <a href="https://www.linkedin.com/company/18490388/">LinkedIn</a>
                        <br/>
                        Email: office@barterout.com
                        <br/>
                        <br/>
                        <a id="backLink" href="/">Click Here to Go Back to BarterOut</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Contact;