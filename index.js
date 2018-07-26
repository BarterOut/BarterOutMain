// Babel polyfill to convert ES6 code in runtime
require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders',
      {
        config: './webpack.config.js',
        verbose: false
      }
  ]
});

require('babel-polyfill');
require('babel-polyfill');
require('./server/server');

