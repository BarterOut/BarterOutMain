/**
 * @file All routes relating to users for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';

const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

/**
 * [RESOURCE] Remakes matches based on the books in the request collection. *Needs testing*
 * @param {String} transactionID ID of the transaction schema saved in the DB.
 */
function remakeMatches(userID) {
  TextbookBuy.find({ owner: userID }, (err, books) => {
    if (books) {
      for (let i = 0; i < books.length; i++) {
        const BOOK = books[i];
        Textbook.find(
          { // looks for a book that matches based on the name matching or the course
            $and: [
              { status: 0 },
              { $or: [{ name: { $regex: BOOK.name, $options: 'i' } }, { course: { $regex: BOOK.course, $options: 'i' } }] },
              { owner: { $ne: userID } },
            ],
          },
          (err, matchedBooks) => {
            const addBooks = [];
            matchedBooks.forEach((book) => {
              addBooks.push(book._id);
            });

            User.update(
              { _id: BOOK.owner },
              {
                $set: {
                  matchedBooks: { addBooks },
                },
              }, (error) => {
                console.error(`Error: ${error}`);
              },
            );
          },
        );
      }
    }
  });
}

/**
 * Method for returning all the current items in a user's cart.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of book objects.
 */
router.get('/getCartItems/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (err, user) => {
        let itemsInCart = [];
        const bookIDs = user.cart;
        Textbook.find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] }, (error, books) => {
          itemsInCart = books;
          res.status(200).json(itemsInCart);
        });
      });
    }
  });
});

/**
 * Adds a given book ID to the in cart section of the user schema.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {String} Success Status.
 */
router.post('/addToCart', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      User.update(
        { _id: authData.userInfo._id },
        {
          $push: {
            cart: {
              $each: [req.body.data.bookID],
              $position: 0,
            },
          },
        }, (er) => {
          if (er){
            console.log("ohhh this is going to make an error");
            res.status(400).json(er);
          }

        },
      );
    }
  });
  res.sendStatus(202);
});

/**
 * Removes given book from cart array in user.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {String} Success Status.
 */
router.post('/removeFromCart', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (err, user) => {
        for (let i = 0; i < user.cart.length; i++) {
          if (user.cart[i] === req.body.data.bookID) {
            user.cart.splice(i, 1);
          }
        }
        User.update(
          { _id: authData.userInfo._id },
          {
            $set:
              {
                cart: user.cart,
              },
          }, (err) => {
            if (err) {
              res.status(400).json(err);
            }
            res.sendStatus(200);
          },
        );
      });
    }
  });
});

/**
 * Called when a user clicks clear cart on the cart page
 * currently not in use.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {String} Success Status.
 */
router.post('/clearCart', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      User.update(
        { _id: authData.userInfo._id },
        {
          $set:
            {
              cart: [],
            },
        },
      );
      res.sendStatus(200);
    }
  });
});

/**
 * Gets all books that have been purchased by a given user.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books purchased by the user.
 */
router.get('/getPurchasedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      Textbook.find({
        $and: [{ status: { $ne: 0 } }, { buyer: authData.userInfo._id }],
      }, (err, booksFound) => {
        res.status(200).json(booksFound);
      });
    }
  });
});

/**
 * Gets all books that have been sold by a given user.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books sold by the user.
 */
router.get('/getSoldBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      Textbook.find({
        $and: [{ status: { $ne: 0 } }, { owner: authData.userInfo._id }],
      }, (err, booksFound) => {
        res.status(200).json(booksFound);
      });
    }
  });
});

/**
 * Gets all of a given users notifications.
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of notifications for the user.
 */
router.get('/getNotifications/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (err, user) => {
        res.status(200).json(user.notifications);
      });
    }
  });
});

/**
 * Gets a given users statistics, (we store money made, books sold
 * and books bought.)
 * @param {Object} req Request from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Stats for the user.
 */
router.get('/getUserStatistics/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (err, user) => {
        res.status(200).json({
          numberOfBooksBought: user.numberOfBooksBought,
          numberOfBooksSold: user.numberOfBooksSold,
          moneyMade: user.moneyMade,
        });
      });
    }
  });
});

router.get('/getUserData/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(400);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.sendStatus(401);
        } else {
          const returnUser = {
            _id: user._id,
            emailAddress: user.emailAddress,
            venmoUsername: user.venmoUsername,
            CMC: user.CMC,
            university: user.university,
            firstName: user.firstName,
            lastName: user.lastName,
            matchedBooks: user.matchedBooks,
          };
          res.status(200).json({
            user: returnUser,
          });
        }
      });
    }
  });
});

/**
 * Removes a matching request for a given user.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {String} Response status.
 */
router.post('/deleteRequest/', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      TextbookBuy.deleteOne({
        $and: [
          { _id: req.body.data.bookID },
          { owner: authData.userInfo._id },
        ],
      }, (error) => {
        remakeMatches(authData.userInfo._id);
        if (!error) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      });
    }
  });
});

/**
 * Gets all the books a given user has requested a match for.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/getRequests/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      TextbookBuy.find({
        owner: authData.userInfo._id,
      }, (error, books) => {
        if (error) {
          res.sendStatus(400);
        } else {
          res.status(200).json(books);
        }
      });
    }
  });
});

// Just in case this is needed
router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;

