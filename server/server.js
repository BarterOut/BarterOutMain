/**
 * @file Entry point of Express.js server.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.1
 */

// TODO: Fix request URL names.
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



// MODELS
import User from './models/user';
import realUser from './models/newUser';
import Textbook from './models/textbook';
import TextbookBuy from './models/textbookBuy';

// PASSPORT
const passport = require('./passport');

// TODO: Fix auto-https redirect.
const sslRedirect = require('heroku-ssl-redirect');

const nodemailer = require('nodemailer');



// USER ROUTE
const user = require('./routes/user');
const booksRoute = require('./routes/books');

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

app.use(passport.initialize());
app.use(passport.session()); // calls serializeUser and deserializeUser
app.use('/api/auth', user);
app.use('api/books', booksRoute);

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

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
    clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
  },
});


// Email sent when user gets matched with a seller
function matchFoundEmail(emailTo, firstName, bookTitle) {
  return {
    from: '"Barter Out" <office@barterout.com',
    to: emailTo,
    subject: 'Match found for you',
    html: `Dear    ${firstName}  ,\n 
    <br> </br> 
    We are excited to let you know that we found a <b>match</b> for your request to buy </b>   ${bookTitle}   </b>. Check it on our website and complete the purchase if you are satisfied with the price and condition of the book. <br> </br>  
    Once you click buy, we will make a request on Venmo, but not pay the seller until we verify the condition of the book. If it doesn’t match your preference, we are sending your money back. <br> </br> \n  
    <br></br>  
    If you have any questions, feel free to send us an email at office@barterout.com!\n 
    <br></br> <br></br>    
    Thank you,<br></br>  
    The BarterOut team<br></br> <br></br> 
    \n 
    Like us on <a href="https://www.facebook.com/BarterOut/" target="_blank">Facebook</a> <br> </br> Follow us on <a href="https://www.instagram.com/barteroutofficial/" target="_blank">Instagram</a>`,
    auth: {
      user: 'office@barterout.com',
      refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
      accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
    },
  };
}

// Email sent to seller when buyer buys their book
function emailToSeller(emailTo, firstName, bookTitle) {
  return {
    from: '"Barter Out" <office@barterout.com',
    to: emailTo,
    subject: 'We found a buyer for your book',
    html: `Dear ${firstName},\n
    <br> </br>
    We are excited to let you know that we found a <b>buyer</b> for your copy of </b>   ${bookTitle}   </b>. <b>Please drop the book</b> at one of our members anytime in the following schedule:\n
    \n  <br> </br>
    <b>Monday - Friday</b>: 11 AM - 4 PM @ the Q&I area in Rush Rhees Library.\n 
    <br> </br> 
    <b>Saturday</b>: 11 AM - 2 PM @ the Q&I area in Rush Rhees Library.\n 
    <br> </br> 
    \n  <br> </br> 
    We will check the condition of the book and if it matches the one advertised, we will send you the money via Venmo.\n <br> </br> 
    <br></br>  
    If you have any questions, feel free to send us an email at office@barterout.com!\n 
    <br></br> <br></br>    
    Thank you,<br></br>  
    The BarterOut team<br></br> <br></br> 
    \n 
    Like us on <a href="https://www.facebook.com/BarterOut/" target="_blank">Facebook</a> <br> </br> Follow us on <a href="https://www.instagram.com/barteroutofficial/" target="_blank">Instagram</a>`,
    auth: {
      user: 'office@barterout.com',
      refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
      accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
    },
  };
}

function venmoRequestEmail(emailTo, firstName, bookTitle) {
  return {
    from: '"Barter Out" <office@barterout.com',
    to: emailTo,
    subject: 'Purchase initiated',
    html: `Dear   ${firstName}  ,     <br></br>  
    \n 
    You purchased   ${bookTitle}   successfully! We will Venmo request you in the next 24 hours and the book will be delivered to you within 3 business days. <br> </br>  
    We want to make sure we are building a service that is useful to you. If you have 3-4 minutes to spare, please consider filling in our <a href="https://goo.gl/forms/KMhLK9N7ZFtHTyjF2">short survey</a>   <br></br> \n' 

    <br></br>  
    If you have any questions, feel free to send us an email at office@barterout.com!\n' 
    <br></br> <br></br>    
    Thank you,<br></br>  
    The BarterOut team<br></br> <br></br> '
    \n 
    Like us on <a href="https://www.facebook.com/BarterOut/" target="_blank">Facebook</a> <br> </br> Follow us on <a href="https://www.instagram.com/barteroutofficial/" target="_blank">Instagram</a>`,
    auth: {
      user: 'office@barterout.com',
      refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
      accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
    },
  };
}

// Email to ourselves when there is a transaction
function emailForUs(buyerUser, sellerUser, bookFound) {
  return {
    from: '"Barter Out" <office@barterout.com',
    to: 'office@barterout.com',
    subject: '[WEBAPP] New Transaction',
    text: `Match found!
\n
Date: ${new Date()}
\n
Book: ${bookFound.name}
Condition: ${bookFound.condition}
Price: ${bookFound.price}
\n
Seller: ${sellerUser.firstName} ${sellerUser.lastName}
Email: ${sellerUser.emailAddress}
Venmo: ${sellerUser.venmoUsername}
\n
Buyer: ${buyerUser.firstName} ${buyerUser.lastName}
Email: ${buyerUser.emailAddress}
Venmo: ${buyerUser.venmoUsername}
CMC Box Number: ${buyerUser.CMC}
`,
    auth: {
      user: 'office@barterout.com',
      refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
      accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
    },
  };
}

function sendEmail(mailOptions) {
  console.log('send the email!');
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

/*
NOTE: Keep all api routes (which should be basically everything)
in the form /api/routeName. This way, we can have a clear distinction between
client side routes (e.g. going to different pages on the website) and server side
routes (e.g. doing a search query in the database).
*/

/**
 * @deprecated
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Error if any, otherwise command to redirect.
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

/**
 * Called when a user posts a book they want to sell.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Error if any, otherwise command to redirect.
 */
app.post('/api/sellBook', (req, res) => {
  console.log('User Selling Book');
  req.body.payload.date = Date.now();
  const newBook = new Textbook(req.body.payload);
  newBook.save()
    .then(() => {
      console.log('Saved Book to DB');

      const theBookID = newBook._id;
      // update match with an and statment such that it doesn't match with users that status other than 0
      TextbookBuy.find({
        $and: [
          { $or: [{ name: { $regex: req.body.payload.name, $options: 'i' } }, { course: { $regex: req.body.payload.course, $options: 'i' } }] },
          { status: 0 },
        ],
      }, (err, matchedBooks) => {
        matchedBooks.forEach((bookMatched) => {
          realUser.update({ _id: bookMatched.owner }, { $addToSet: { matchedBooks: theBookID } });
          realUser.find({ _id: bookMatched.owner }, (error, userToEmail) => {
            if (userToEmail[0] == null) {
              res.redirect('/home');
              return;
            }
            sendEmail(matchFoundEmail(userToEmail[0].emailAddress, userToEmail[0].firstName, bookMatched.name));
          });
        });
      });
      res.redirect('/home');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

/**
 * Called when a user posts a book they want to buy.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
app.post('/api/buyBook', (req, res) => {
  console.info('User posting book to Buy');

  req.body.payload.date = Date.now();
  const newBook = new TextbookBuy(req.body.payload);
  newBook.save()
    .then(() => {
      console.info('Book was saved to DB');

      Textbook.find(
        { // looks for a book that matches based on the name matching and the
          $and: [
            { status: 0 },
            { $or: [{ name: { $regex: req.body.payload.name, $options: 'i' } }, { course: { $regex: req.body.payload.course, $options: 'i' } }] },
          ],
        },
        (err, matchedBooks) => {
          console.log('Book was found in matching.');

          const addBooks = [];
          matchedBooks.forEach((book) => {
            addBooks.push(book._id);
          });
          if (addBooks.length !== 0) {
            realUser.find({ _id: req.body.payload.owner }, (error, userToEmail) => {
              const email = userToEmail[0].emailAddress;
              const firstName = userToEmail[0].firstName;
              sendEmail(matchFoundEmail(email, firstName, req.body.payload.name));
            });
          }
          realUser.update({ _id: req.body.payload.owner }, { $addToSet: { matchedBooks: { $each: addBooks } } }, (error) => {
            console.warn(`Error: ${error}`);
          });
        },
      );
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
app.post('/api/clickBuy', (req, res) => {
  let buyer;
  let bookFound;
  let seller;

  realUser.find({ _id: req.body.userID }, (err, foundUser) => {
    buyer = foundUser[0];
    Textbook.update({ _id: req.body.bookID }, { $set: { status: 1 } }, (error) => {
      console.log(`Error: ${error}`);
    });
    Textbook.find({ _id: req.body.bookID }, (errors, foundBook) => {
      bookFound = foundBook[0];
      TextbookBuy.update({
        $and: [{ status: 0 }, { $or: [{ name: bookFound.name }, { course: bookFound.course }] },
          { owner: req.body.userID }],
      }, { $set: { status: 1 } }, (error) => {
        console.log(`Error in finding book being bought:  ${error}`);
      });
      realUser.find({ _id: bookFound.owner }, (error, sellerUser) => {
        seller = sellerUser[0];
        sendEmail(emailForUs(buyer, seller, bookFound));
        sendEmail(emailToSeller(seller.emailAddress, seller.firstName, bookFound.name));
        sendEmail(venmoRequestEmail(buyer.emailAddress, buyer.firstName, bookFound.name));
      });
    });
  });
  res.json(true);
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
app.post('/api/showMatches', (req, res) => {
  realUser.find({ _id: req.body.id }, (err, userMatch) => {
    let bookObjects = [];
    const bookIDs = userMatch[0].matchedBooks;
    Textbook.find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] }, (error, books) => {
      bookObjects = books;
      res.json(bookObjects);
    });
  });
});

/**
 * Finds all books in database with a matching name or course.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
app.get('/api/searchBook/:query', (req, res) => {
  const searchKey = req.params.query;
  Textbook.find({
    $and: [
      { status: 0 },
      { $or: [{ name: { $regex: searchKey, $options: 'i' } }, { course: { $regex: searchKey, $options: 'i' } }] },
    ],
  }, (err, books) => {
    const bookMap = [];
    books.forEach((book) => {
      bookMap.push(book);
    });
    res.json(bookMap);
  });
});

/**
 * @deprecated Due to inefficiency
 * Gets all books being sold from database.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
app.get('/api/displayAllBooks', (req, res) => {
  Textbook.find({ status: 0 }, (err, books) => {
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
