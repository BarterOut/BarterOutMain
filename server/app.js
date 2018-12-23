/**
 * @file app.js.
 * @description Mock server for testing that doesn't use webpack.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import Express from 'express';
import path from 'path';

// Mongoose for database models and access.
import mongoose from 'mongoose';

// Configs and kittens for testing database.
import serverConfig from './config';

const sslRedirect = require('heroku-ssl-redirect');

// API Routes
const auth = require('./routes/auth');
const user = require('./routes/user');
const books = require('./routes/books');
const dashboard = require('./routes/dashboard');

const PORT = serverConfig.port;

const bodyParser = require('body-parser');
const session = require('express-session');

// Initialize the Express App
const app = new Express();

app.use(sslRedirect());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Make salting string better.
app.use(session({
  secret: 'ourOwnSaltingString', // pick a random string to make the hash that is generated secure
  // Following lines are to avoid some deprecation warnings
  resave: false, // required
  saveUninitialized: false, // required
  cookie: { secure: false },
}));

function forceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}

if (process.env.NODE_ENV === 'production') {
  app.use(forceSsl);
}

// Prefer gzipped js files.
app.get('*.js', (req, res, next) => {
  // res.set('Cache-Control', 'public, max-age=2629800');
  res.set('Content-Encoding', 'gzip');
  next();
});

// Set cache policy to cache for one month on images
app.get('*.jpg', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=2629800');
  next();
});

app.get('*.png', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=2629800');
  next();
});

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/books', books);
app.use('/api/dashboard', dashboard);

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

mongoose.connect(serverConfig.mongoURL, { useMongoClient: true }, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Start App
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

// Catch all function, if route is not in form /api/ then
// this function return the index page and allows the client to
// handle the routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/core/index.html'));
});

export default app;
