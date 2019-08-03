/**
 * @file books.js
 * @description All routes relating to books for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';
import Transaction from '../models/transaction';

import response from '../resources/response';
import Pricing from '../resources/pricing';
import config from '../config';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const emails = require('../resources/emails');
const notification = require('../resources/Notifications');

const BOOK_LIMIT = 40;

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.NEV_CLIENT_SECRET,
  },
});

/**
 * [RESOURCE] Sends out all needs emails when a transaction occurs.
 * @param {String} transactionID ID of the transaction schema saved in the DB.
 */
function transactionEmail(transactionID) {
  Transaction.findOne({ _id: transactionID }, (err, transa) => {
    User.findOne({ _id: transa.buyerID }, (E, buyer) => {
      for (let i = 0; i < transa.booksPurchased.length; i++) {
        Textbook.findOne({ _id: transa.booksPurchased[i] }, (er, book) => {
          User.findOne({ _id: book.owner }, (E, seller) => {
            sendEmail(emails.emailForUs(buyer, seller, book));
            sendEmail(emails.emailToSeller(seller.emailAddress, seller.firstName, book.name));
            sendEmail(emails.venmoRequestEmail(buyer.emailAddress, buyer.firstName, book.name));
          });
        });
      }
    });
  });
}

/**
 * [RESOURCE] Sends a given email.
 * @param {Object} mailOptions Required options to send email, various address, subject, etc.
 */
function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err); // eslint-disable-line
    } else {
      console.info(info); // eslint-disable-line
    }
  });
}

/**
 * User posts a book they want to sell.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard response.
 */
router.post('/postBook/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (error) {
          res.status(401).json(response({ error }));
        } else {
          const newBook = new Textbook(req.body.data);
          newBook.save()
            .then(() => {
              const theBookID = newBook._id;

              User.update(
                { _id: authData.userInfo._id },
                {
                  $push: {
                    notifications: {
                      $each: [notification.thanksForPosting(newBook.name)],
                      $position: 0,
                    },
                  },
                }, (error) => {
                  console.error(`Error: ${error}`); // eslint-disable-line
                },
              );

              // update match with an and statment such that
              // it doesn't match with users that status other than 0
              TextbookBuy.find({
                $and: [
                  { $or: [{ name: { $regex: req.body.data.name, $options: 'i' } }, { course: { $regex: req.body.data.course, $options: 'i' } }] },
                  { status: 0 },
                  { owner: { $ne: authData.userInfo._id } },

                ],
              }, (error, matchedBooks) => {
                if (error) {
                  res.status(401).json(response({ error }));
                  return;
                }
                matchedBooks.forEach((bookMatched) => {
                  User.update(
                    { _id: bookMatched.owner },
                    {
                      $addToSet: { matchedBooks: theBookID },
                    },
                  );
                  User.find({ _id: bookMatched.owner }, (errr, userToEmail) => {
                    if (userToEmail[0] == null) {
                      res.redirect('/home'); // TODO: eliminate this redirect
                      return;
                    }
                    const email = userToEmail[0].emailAddress;
                    const firstName = userToEmail[0].firstName;
                    sendEmail(emails.matchFoundEmail(email, firstName, bookMatched.name));
                  });
                });
              });
              res.status(200).json(response({}));
            })
            .catch((error) => {
              res.status(400).json(response({ error }));
            });
        }
      });
    }
  });
});

/**
 * User requests a book they want.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard response.
 */
router.post('/requestBook', (req, res) => {
  const BOOK = req.body.data.payload;
  const TOKEN = req.body.data.token;
  jwt.verify(TOKEN, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (er, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else {
          BOOK.date = Date.now();
          const newBook = new TextbookBuy(BOOK);
          newBook.save()
            .then(() => {
              User.update(
                { _id: authData.userInfo._id },
                {
                  $push: {
                    notifications: {
                      $each: [notification.postedRequest(newBook.name)],
                      $position: 0,
                    },
                  },
                }, (error) => {
                  console.error(`Error: ${error}`); // eslint-disable-line
                },
              );

              Textbook.find(
                { // looks for a book that matches based on the name matching or the course
                  $and: [
                    { status: 0 },
                    { $or: [{ name: { $regex: BOOK.name, $options: 'i' } }, { course: { $regex: BOOK.course, $options: 'i' } }] },
                    { owner: { $ne: authData.userInfo._id } },
                  ],
                },
                (err, matchedBooks) => {
                  const addBooks = [];
                  matchedBooks.forEach((book) => {
                    addBooks.push(book._id);
                  });
                  if (addBooks.length !== 0) {
                    User.find({ _id: BOOK.owner }, (error, userToEmail) => {
                      const email = userToEmail[0].emailAddress;
                      const firstName = userToEmail[0].firstName;
                      sendEmail(emails.matchFoundEmail(email, firstName, BOOK.name));
                    });
                  }
                  User.update(
                    { _id: BOOK.owner },
                    {
                      $addToSet: {
                        matchedBooks: { $each: addBooks },
                      },
                    }, (error) => {
                      console.error(`Error: ${error}`); // eslint-disable-line
                    },
                  );
                },
              );
            })
            .catch((err) => {
              res.status(400).json(response({ error: err }));
            });
        }
      });
    }
    res.status(200).json(response({}));
  });
});

/**
 * User checks out of cart.
 * @param {Object} req Request body from client, includes array of book ID's from cart.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard response.
 */
router.post('/checkoutCart/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      let buyer;
      let bookFound;
      let totalCharged = 0;

      User.find({ _id: authData.userInfo._id }, (error, foundUser) => {
        if (error) {
          res.status(401).json(response({ error }));
          return;
        }

        buyer = foundUser[0];

        for (let i = 0; i < req.body.data.cart.length; i++) {
          // Updates the user
          User.update(
            { _id: authData.userInfo._id },
            { $inc: { numberOfBooksBought: 1 } }, (error) => {
              console.error(`Error: ${error}`); // eslint-disable-line
            },
          );

          Textbook.update(
            { _id: req.body.data.cart[i]._id },
            { $set: { status: 1, buyer: authData.userInfo._id } }, (error) => {
              console.error(`Error: ${error}`); // eslint-disable-line
            },
          );

          // Updates the books being sought by the user that match the query
          Textbook.find(
            { _id: req.body.data.cart[i]._id },
            (errors, foundBook) => {
              bookFound = foundBook[0];
              totalCharged += bookFound.price;

              // Set status of requested book if they exist
              TextbookBuy.update({
                $and: [
                  { status: 0 },
                  {
                    $or: [
                      { name: bookFound.name },
                      { course: bookFound.course },
                    ],
                  },
                  { owner: authData.userInfo._id },
                ],
              }, { $set: { status: 1 } }, (error) => {
                console.warn(`Error in finding book being bought: ${error}`); // eslint-disable-line
              });

              // FOR SELLER USER STATISTICS
              User.update(
                { _id: bookFound.owner },
                { $inc: { numberOfBooksSold: 1, moneyMade: bookFound.price } }, (error) => {
                  console.error(`Error update seller: ${error}`); // eslint-disable-line
                },
              );

              // For this specific book, find seller
              if (i === req.body.data.cart.length - 1) {
                const newTransaction = new Transaction({
                  buyerID: buyer._id,
                  buyerFirstName: buyer.firstName,
                  buyerLastName: buyer.lastName,
                  buyerVenmo: buyer.venmoUsername,
                  buyerEmail: buyer.emailAddress,
                  totalCharged: totalCharged + (totalCharged * Pricing.FEE),
                  booksPurchased: req.body.data.cart,
                });
                newTransaction.save()
                  .then(() => {
                    transactionEmail(newTransaction._id);
                  });
              }
            },
          );
        }
      });
      // Clear the user's cart
      User.update(
        { _id: authData.userInfo._id },
        {
          $set:
            {
              cart: [],
            },
        }, (error) => {
          if (error) {
            res.status(400).json(response({ error }));
          }
        },
      );
      res.status(200).json(response({}));
    }
  });
});

/**
 * Gets all books in given users matched books array.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of book objects.
 */
router.get('/getUserMatches/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else {
          let bookObjects = [];
          const bookIDs = user.matchedBooks;
          Textbook
            .find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] })
            .sort({ date: -1 })
            .exec((error, books) => {
              bookObjects = books;
              for (let i = 0; i < bookObjects.length; i++) {
                for (let x = 0; x < user.cart.length; x++) {
                  if (String(bookObjects[i]._id) === String(user.cart[x])) {
                    bookObjects[i].status = 42;
                  }
                }
              }
              bookObjects = books;
              res.status(200).json(response(bookObjects));
            });
        }
      });
    }
  });
});

/**
 * Finds all books in database with a matching name, course or ISBN.
 * Excluding the books posted by the user searching.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/search/:query/:token', (req, res) => {
  const searchKey = req.params.query;
  const parsed = Number.parseInt(searchKey, 10);
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (Number.isNaN(parsed)) {
      Textbook.find({
        $and: [
          { status: 0 },
          { owner: { $ne: authData.userInfo._id } },
          {
            $or: [
              { name: { $regex: searchKey, $options: 'i' } },
              { course: { $regex: searchKey, $options: 'i' } },
            ],
          },
        ],
      }, (err, books) => {
        res.status(200).json(response(books));
      });
    } else {
      Textbook
        .find({
          $and: [
            { status: 0 },
            { owner: { $ne: authData.userInfo._id } },
            {
              $or: [
                { name: { $regex: searchKey, $options: 'i' } },
                { course: { $regex: searchKey, $options: 'i' } },
                { ISBN: { $eq: parsed } },
              ],
            },
          ],
        })
        .sort({ date: -1 })
        .exec((error, books) => {
          if (!error) {
            res.status(200).json(response(books));
          } else { res.status(400).json(response({ error })); }
        });
    }
  });
});

/**
 * Finds all books in database with a matching name, course or ISBN.
 * NO TOKEN
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/search/:query', (req, res) => {
  const searchKey = req.params.query;
  const parsed = Number.parseInt(searchKey, 10);
  if (Number.isNaN(parsed)) {
    Textbook.find({
      $and: [
        { status: 0 },
        {
          $or: [
            { name: { $regex: searchKey, $options: 'i' } },
            { course: { $regex: searchKey, $options: 'i' } },
          ],
        },
      ],
    }, (err, books) => {
      res.status(200).json(response(books));
    });
  } else {
    Textbook
      .find({
        $and: [
          { status: 0 },
          {
            $or: [
              { name: { $regex: searchKey, $options: 'i' } },
              { course: { $regex: searchKey, $options: 'i' } },
              { ISBN: { $eq: parsed } },
            ],
          },
        ],
      })
      .sort({ date: -1 })
      .exec((err, books) => {
        res.status(200).json(response(books));
      });
  }
});

/**
 * Returns all of a given users posts.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/getUsersPosts/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      Textbook.find({
        $and: [
          { status: 0 },
          { owner: authData.userInfo._id },
        ],
      }, (err, books) => {
        const bookMap = [];
        books.forEach((book) => {
          bookMap.push(book);
        });
        res.status(200).json(response(bookMap));
      });
    }
  });
});

/**
 * Removes a book up for sale from the database.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/deleteBook/', (req, res) => {
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      Textbook.deleteOne({
        $and: [
          { _id: req.body.data.bookID },
          { owner: authData.userInfo._id },
        ],
      }, (error) => {
        if (!error) {
          res.status(200).json(response({}));
        } else {
          res.status(400).json(response({ error }));
        }
      });
    }
  });
});

/**
 * Gets all books being sold from database and that are not from the user.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/getAllBooks/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create and account.' }));
        } else {
          Textbook
            .find({
              $and: [
                { status: 0 },
                { owner: { $ne: authData.userInfo._id } }],
            })
            .limit(BOOK_LIMIT)
            .sort({ date: -1 })
            .exec((err, books) => {
              User.findById(authData.userInfo._id, (err, user) => {
                const booksList = books;
                for (let i = 0; i < booksList.length; i++) {
                  for (let x = 0; x < user.cart.length; x++) {
                    if (booksList[i]._id == user.cart[x]) {
                      booksList[i].status = 42;
                    }
                  }
                }
                res.status(200).json(response(booksList));
              });
            });
        }
      });
    }
  });
});

/**
 * Returns given limit books in the database, without
 * requiring a token.
 * NOTE: This will display posts to a user that they
 * posted.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/getBooksNoToken', (req, res) => {
  Textbook.find({ status: 0 })
    .limit(BOOK_LIMIT)
    .sort({ date: -1 })
    .exec((err, books) => {
      res.status(200).json(response(books));
    });
});

router.get('/', (req, res) => {
  res.status(200).json(response({}));
});

module.exports = router;
