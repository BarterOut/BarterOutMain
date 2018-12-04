/**
 * @file App.js.
 * @description Entry component.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import routes from '../routes';

export default function App() {
  return (
    <Router>
      { routes }
    </Router>
  );
}
