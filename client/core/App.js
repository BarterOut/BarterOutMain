/**
 * Root Component
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
