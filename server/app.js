/**
 * @file app.js
 * @description Define the app to listen on port.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */

import Express from 'express';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

// DB Connection
import mongoDB from './database/mongoDB';

const bodyParser = require('body-parser');
const session = require('express-session');

// Error Handling Service
const Airbrake = require('@airbrake/node');

// API Routes
const auth = require('./routes/auth');
const user = require('./routes/user');
const books = require('./routes/books');
const dashboard = require('./routes/dashboard');

// Initialize the Express App
const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  // pick a random string to make the hash that is generated secure
  secret: process.env.SALTING_STRING || 'secret',
  resave:            false,
  saveUninitialized: false,
  cookie:            { secure: false },
}));

if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
  const airbrake = new Airbrake.Notifier({ // eslint-disable-line
    projectId:  process.env.AIRBRAKE_ID,
    projectKey: process.env.AIRBRAKE_KEY,
  });
}


if (process.env.NODE_ENV === 'production'
    || process.env.NODE_ENV === 'staging') {
  // Set cache policy to cache for one month on images
  app.get('*.jpg', (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=2629800');
    next();
  });

  app.get('*.png', (req, res, next) => {
    res.set('Cache-Control', 'public, max-age=2629800');
    next();
  });
}

// Prefer gzipped js files.
app.get('*.js', (req, res, next) => {
  // for zipping our main JS bundles
  res.set('Content-Encoding', 'gzip');
  // Set cache policy to cache for one month on js files
  // res.set('Cache-Control', 'public, max-age=2629800');
  next();
});

// server-side API endpoints
app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/books', books);
app.use('/api/dashboard', dashboard);

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo:     true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

mongoDB.connect();

// error handling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({
      success: false,
      message: 'No token provided.',
    });
  }
  return next();
});

// Catch all function, if route is not in form /api/ then
// this function return the index page and allows the client to
// handle the routing.
app.get('*', (req, res) => {
  if (req.protocol === 'http' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://www.barterout.com${req.url}`);
  } else {
    res.sendFile(path.join(__dirname, '../client/core/index.html'));
  }
});

export default app;
