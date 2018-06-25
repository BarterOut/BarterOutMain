/**
 * @file Entry point of Express.js server.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.2
 */

// TODO: Make sure all methods send a response.
// TODO: Comment all code.

import Express from 'express';
import path from 'path';

// Mongoose for database models and access.
import mongoose from 'mongoose';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

// Configs and kittens for testing database.
import serverConfig from './config';
import kittens from './kittens/kitten';

// PASSPORT
const passport = require('./passport');

// TODO: Fix auto-https redirect.
const sslRedirect = require('heroku-ssl-redirect');


// USER ROUTE
const user = require('./routes/user');
const booksRoute = require('./routes/books');
const dashboard = require('./routes/dashboard');

const PORT = serverConfig.port;

const bodyParser = require('body-parser');
const session = require('express-session');

// Initialize the Express App
const app = new Express();

app.use(sslRedirect());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sessions
// const session = require('express-session')
app.use(session({
  secret: 'ourOwnSaltingString', // pick a random string to make the hash that is generated secure
  // Following lines are to avoid some deprecation warnings
  resave: false, // required
  saveUninitialized: false, // required
  cookie: { secure: false },
}));

const ENV = 'development';

function forceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}

if (ENV === 'production') {
  app.use(forceSsl);
}

app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser
app.use('/api/auth', user);
app.use('/api/books', booksRoute);
app.use('/api/dashboard', dashboard);

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

mongoose.connect(serverConfig.mongoURL, { useMongoClient: true }, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  // feed some dummy data in DB.
  kittens();
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
