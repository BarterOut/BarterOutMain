import Express from 'express';

// MISC
import path from 'path';
import mongoose from 'mongoose';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

import serverConfig from './config';
import kittens from './kittens/kitten';

// MODELS
import User from './models/user';
import Textbook from './models/textbook';
import TextbookBuy from './models/textbookBuy';

// PASSPORT
const passport = require('./passport');

// USER ROUTE
const user = require('./routes/user');

const PORT = serverConfig.port;

const bodyParser = require('body-parser');
const session = require('express-session');

// Initialize the Express App
const app = new Express();

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

app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser
app.use('/api/auth', user);

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

/*
NOTE: Keep all api routes (which should be basically everything)
in the form /api/routeName. This way, we can have a clear distinction between
client side routes (e.g. going to different pages on the website) and server side
routes (e.g. doing a search query in the database).
*/
app.post('/api/preRegister', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(() => {
      res.redirect('/preRegister');
    })
    .catch((err) => {
      res.status(400).send(`Unable to save to database ${err}`);
    });
});

app.post('/api/sellBook', (req, res) => {
  req.body.payload.date = Date.now();
  const newBook = new Textbook(req.body.payload);
  newBook.save()
    .then(() => {
      res.redirect('/home');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

app.post('/api/buyBook', (req, res) => {
  req.body.payload.date = Date.now();
  const newBook = new TextbookBuy(req.body.payload);
  newBook.save()
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/searchBook/:query', (req, res) => {
  const searchKey = req.params.query;
  Textbook.find({ name: { $regex: searchKey, $options: 'i' } }, (err, books) => {
    const bookMap = [];
    books.forEach((book) => {
      bookMap.push(book);
    });
    res.json(bookMap);
  });
});

app.get('/api/displayAllBooks', (req, res) => {
  Textbook.find({}, (err, books) => {
    res.json(books);
  });
});

// Catch all function, if route is not in form /api/ then
// this function return the index page and allows the client to
// handle the routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/core/index.html'));
});

export default app;
