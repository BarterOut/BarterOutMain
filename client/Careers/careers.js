import React from 'react';
import {
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux'

import styles from './careers.css';
import regularFont from './sylesheetOrkneyRegular.css';
import animations from './animate.css';

const Careers = () => {
    return (
        <div className="app">
            <div className="careersPage">
                <div className="container">
                    <div className="pageText animated fadeIn">
                        <h1>Careers</h1>
                        We currently do not have any positions open, but be sure to check again in the future, as BarterOut is
                        growing every day!
                        <br/>
                        <br/>
                        <a id="backLink" href="/">Click Here to Go Back to BarterOut</a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Careers;