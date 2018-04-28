
/**
 * Root Component
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'


import routes from '../routes';

import 'bootstrap/dist/css/bootstrap.css'

export default function App(props) {
    return (
        <Router>
            { routes }
        </Router>
    );
}