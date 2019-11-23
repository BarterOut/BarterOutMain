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

// TODO: This needs to return a promise.
/**
 * [RESOURCE] Remakes matches based on the books in the request collection. *Needs testing*
 * @param {String} userID ID of the transaction schema saved in the DB.
 */
function remakeMatches(userID) {
  TextbookBuy.find({ owner: userID }, (err, books) => {
    if (books) {
      for (let i = 0; i < books.length; i++) {
        const BOOK = books[i];
        // looks for a book that matches based on the name matching or the course
        Textbook.find(
          {
            $and: [
              { status: 0 },
              {
                $or: [
                  { name: { $regex: BOOK.name, $options: 'i' } },
                  { course: { $regex: BOOK.course, $options: 'i' } },
                ],
              },
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
                if (error) {
                  throw new Error(`Error making matches: ${error}`);
                }
              },
            );
          },
        );
      }
    }
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
      }, (err) => {
        if (err) {
          res.status(400).json(response({ err }));
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
 * @deprecated
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

// TODO: Fix this method.

/**
 * @description Removes a matching request
 * for a given user.
 * @access Restricted
 */
function deleteRequest(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  TextbookBuy.deleteOne({
    $and: [
      { _id: req.body.data.bookID },
      { owner: _id },
    ],
  }, (error) => {
    if (error) {
      res.status(400).json(response({ error }));
    } else {
      remakeMatches(_id);
      res.status(200).json(response());
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
router.post('/addToCart', auth.required, addToCart);
router.post('/removeFromCart', auth.required, removeFromCart);
router.post('/clearCart', auth.required, clearCart);
router.get('/getPurchasedBooks', auth.required, getPurchasedBooks);
router.get('/getUserData', auth.required, getUserData);
router.get('/getSoldBooks', auth.required, getSoldBooks);
router.post('/deleteRequest', auth.required, deleteRequest);
router.get('/getUserStatistics', auth.required, getUserStatistics);
router.get('/getNotifications', auth.required, getNotifications);

module.exports = router;
