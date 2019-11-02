/**
 * @file index.js.
 * @description Entry point of client.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import '../scss/custom.scss';

import App from './App';

const mountApp = document.getElementById('root');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  mountApp,
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      mountApp,
    );
  });
}
