/**
 * @file Booksß routes for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import realUser from '../models/newUser';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

const emails = require('../emails/emailFunctions');

const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
    clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
  },
});


function sendEmail(mailOptions) {
  console.log('Sending the email!');
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.info(info);
    }
  });
}


/**
 * Called when a user posts a book they want to sell.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {String} Status Code
 */
router.post('/postBook/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      realUser.findOne({ _id: authData.userInfo._id }, (err, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (err) {
          res.status(401).send(err);
        } else {
          console.log('User Selling Book');
          const newBook = new Textbook(req.body.data);
          newBook.save()
            .then(() => {
              console.log('Saved Book to DB');
              const theBookID = newBook._id;
              // update match with an and statment such that
              // it doesn't match with users that status other than 0
              TextbookBuy.find({
                $and: [
                  { $or: [{ name: { $regex: req.body.data.name, $options: 'i' } }, { course: { $regex: req.body.data.course, $options: 'i' } }] },
                  { status: 0 },
                ],
              }, (er, matchedBooks) => {
                if (er) {
                  res.status(401).send(er);
                  return;
                }
                matchedBooks.forEach((bookMatched) => {
                  realUser.update(
                    { _id: bookMatched.owner },
                    {
                      $addToSet: { matchedBooks: theBookID },
                    },
                  );
                  realUser.find({ _id: bookMatched.owner }, (errr, userToEmail) => {
                    if (userToEmail[0] == null) {
                      res.redirect('/home');
                      return;
                    }
                    const email = userToEmail[0].emailAddress;
                    const firstName = userToEmail[0].firstName;
                    sendEmail(emails.matchFoundEmail(email, firstName, bookMatched.name));
                  });
                });
              });
              res.status(200).send();
            })
            .catch((e) => {
              res.status(400).send(e);
            });
        }
      });
    }
  });
});

/**
 * Called when a user posts a book they want to buy.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.post('/requestBook', (req, res) => {
  // Method to verify, this is commented out because everything depends on
  // having some infomration in the session storage

  console.log(req.body.data.token);

  jwt.verify(req.body.data.token, 'secretKey', (errr, authData) => {
    if (errr) {
      res.sendStatus(403);
    } else {
      realUser.findOne({ _id: authData.userInfo._id }, (er, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else {
          console.info('User posting book to Buy');

          req.body.data.payload.date = Date.now();
          const newBook = new TextbookBuy(req.body.data.payload);
          newBook.save()
            .then(() => {
              console.info('Book was saved to DB');

              Textbook.find(
                { // looks for a book that matches based on the name matching and the
                  $and: [
                    { status: 0 },
                    { $or: [{ name: { $regex: req.body.data.payload.name, $options: 'i' } }, { course: { $regex: req.body.data.payload.course, $options: 'i' } }] },
                  ],
                },
                (err, matchedBooks) => {
                  console.log('Book was found in matching.');

                  const addBooks = [];
                  matchedBooks.forEach((book) => {
                    addBooks.push(book._id);
                  });
                  if (addBooks.length !== 0) {
                    realUser.find({ _id: req.body.data.payload.owner }, (error, userToEmail) => {
                      const email = userToEmail[0].emailAddress;
                      const firstName = userToEmail[0].firstName;
                      sendEmail(emails.matchFoundEmail(email, firstName, req.body.data.payload.name));
                    });
                  }
                  realUser.update(
                    { _id: req.body.data.payload.owner },
                    {
                      $addToSet: {
                        matchedBooks: { $each: addBooks },
                      },
                    }, (error) => {
                      console.error(`Error: ${error}`);
                    },
                  );
                },
              );
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      });
    }

    res.sendStatus(200);
  });
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.post('/clickBuy', (req, res) => {
  jwt.verify(req.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      realUser.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else {
          let buyer;
          let bookFound;
          let seller;

          realUser.find({ _id: req.body.userID }, (e, foundUser) => {
            if (e) {
              res.status(401).send(err);
              return;
            }
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
                sendEmail(emails.emailForUs(buyer, seller, bookFound));
                sendEmail(emails.emailToSeller(seller.emailAddress, seller.firstName, bookFound.name));
                sendEmail(emails.venmoRequestEmail(buyer.emailAddress, buyer.firstName, bookFound.name));
              });
            });
          });
          res.json(true);
        }
      });
    }
  });
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.get('/getUserMatches/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      realUser.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else {
          realUser.find({ _id: authData.userInfo._id }, (err, userMatch) => {
            let bookObjects = [];
            const bookIDs = userMatch[0].matchedBooks;
            Textbook.find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] }, (error, books) => {
              bookObjects = books;
              res.json(bookObjects);
            });
          });
        }
      });
    }
  });
});

/**
 * Finds all books in database with a matching name or course.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/search/:query', (req, res) => {
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
    res.status(200).json(bookMap);
  });
});

/**
 * @deprecated Due to inefficiency
 * Gets all books being sold from database.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getAllBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      realUser.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else {
          Textbook.find({ status: 0 }, (err, books) => {
            res.json(books);
          });
        }
      });
    }
  });
});

router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});


module.exports = router;
