/**
 * @file All routes relating to users for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

// Models
import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';

import response from '../resources/response';
import auth from '../auth';

const express = require('express');

const router = express.Router();

/**
 * [RESOURCE] Remakes matches of a certain user.
 * @param {String} userID ID of the user.
 */
function remakeMatches(userID) {
  // find all books requested by the user
  return TextbookBuy.find({ owner: userID })
    .then((error, books) => {
      if (books) {
        // for each requested book
        books.forEach((book) => {
          // find any available book that matches the
          // name or course code, and was not posted by userID
          Textbook.find(
            {
              $and: [
                { status: 0 },
                {
                  $or: [
                    { name:   { $regex: book.name, $options: 'i' } },
                    { course: { $regex: book.course, $options: 'i' } },
                  ],
                },
                { owner: { $ne: userID } },
              ],
            },
          )
            .then((error, matchedBooks) => {
              const addBooks = [];
              matchedBooks.forEach((book) => {
                addBooks.push(book._id);
              });
              User.update(
                { _id: userID },
                {
                  $set: {
                    matchedBooks: { addBooks },
                  },
                },
              )
                .then(() => Promise.resolve());
            });
        });
      }
      User.update(
        { _id: userID },
        {
          $set: {
            matchedBooks: [],
          },
        },
      )
        .then(() => Promise.resolve());
    });
}

/**
 * @description Method for returning all the
 * current items in a user's cart.
 * @access Restricted
 */
function getCartItems(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (err, user) => {
    let itemsInCart = [];
    const bookIDs = user.cart;
    Textbook.find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] }, (error, books) => {
      itemsInCart = books;
      res.status(200).json(response(itemsInCart));
    });
  });
}

/**
 * @description Adds a given book ID to the in
 * cart section of the user schema.
 * @access Restricted
 */
function addToCart(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.update(
    { _id },
    {
      $push: {
        cart: {
          $each: [req.body.data.bookID],
          $position: 0,
        },
      },
    }, (error) => {
      if (error) {
        res.status(400).json((response({ error })));
      }
    },
  );
  res.status(202).json(response());
}

/**
 * @description Removes given book from cart array in user.
 * @access Restricted
 */
function removeFromCart(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (err, user) => {
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i] === req.body.data.bookID) {
        user.cart.splice(i, 1);
      }
    }
    User.update(
      { _id },
      {
        $set:
          {
            cart: user.cart,
          },
      }, (error) => {
        if (error) {
          res.status(400).json(response({ error }));
        }
        res.status(200).json(response());
      },
    );
  });
}

/**
 * @access Called when a user clicks
 * clear cart on the cart page currently not in use.
 * @access Restricted
 */
function clearCart(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.update(
    { _id },
    {
      $set:
        {
          cart: [],
        },
    },
  );
  res.status(200).json(response());
}

/**
 * @description Gets all books that have been
 * purchased by a given user.
 * @access Restricted
 */
function getPurchasedBooks(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  Textbook.find({
    $and: [{ status: { $ne: 0 } }, { buyer: _id }],
  }, (err, booksFound) => {
    res.status(200).json(response(booksFound));
  });
}

/**
 * @description Gets all books that have
 * been sold by a given user.
 * @access Restricted
 */
function getSoldBooks(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  Textbook.find({
    $and: [{ status: { $ne: 0 } }, { owner: _id }],
  }, (err, booksFound) => {
    res.status(200).json(response(booksFound));
  });
}

/**
 * @description Returns a list of notifications
 * for a given user.
 * @access Restricted
 */
function getNotifications(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (err, user) => {
    res.status(200).json(response(user.notifications));
  });
}

/**
 * @description Gets a given users statistics,
 * (we store money made, books sold and books bought.)
 * @access Restricted
 */
function getUserStatistics(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (err, user) => {
    res.status(200).json(response({
      numberOfBooksBought: user.numberOfBooksBought,
      numberOfBooksSold: user.numberOfBooksSold,
      moneyMade: user.moneyMade,
    }));
  });
}

/**
 * @description Returns data of the
 * currently logged in user.
 * @access Restricted
 */
function getUserData(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (error, user) => {
    if (!user) {
      res.status(401).json(response());
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
      res.status(200).json(response({
        user: returnUser,
      }));
    }
  });
}

/**
 * @description Removes a matching request
 * for a given user.
 * @access Restricted
 */
function deleteRequest(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const { body: { data: { bookID } } } = req;
  TextbookBuy.deleteOne({
    $and: [
      { _id: bookID },
      { owner: _id },
    ],
  }, (error) => {
    if (error) {
      res.status(400).json(response({ error }));
    } else {
      remakeMatches(_id)
        .then(() => res.status(200).json(response()));
    }
  });
}

/**
 * @description Gets all the books a given
 * user has requested a match for.
 * @access Restricted
 */
function getUserRequests(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  TextbookBuy.find({
    owner: _id,
  }, (error, books) => {
    if (error) {
      res.status(400).json(response({ error }));
    } else {
      res.status(200).json(response(books));
    }
  });
}

function userBase(req, res) {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
}

router.get('/', userBase);
router.get('/getRequests', auth.required, getUserRequests);
router.get('/getCartItems/', auth.required, getCartItems);
router.get('/getPurchasedBooks', auth.required, getPurchasedBooks);
router.get('/getUserData', auth.required, getUserData);
router.get('/getSoldBooks', auth.required, getSoldBooks);
router.get('/getUserStatistics', auth.required, getUserStatistics);
router.get('/getNotifications', auth.required, getNotifications);

router.post('/deleteRequest', auth.required, deleteRequest);
router.post('/addToCart', auth.required, addToCart);
router.post('/removeFromCart', auth.required, removeFromCart);
router.post('/clearCart', auth.required, clearCart);

module.exports = router;
