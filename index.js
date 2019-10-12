require('dotenv').config();
require('babel-register')({
  plugins: [
    [
      'babel-plugin-webpack-loaders',
      {
        config: './webpack.config.js',
        verbose: false,
      },
    ],
  ],
});

require('babel-polyfill');
require('./server/app');
