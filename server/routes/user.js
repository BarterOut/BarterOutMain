import Textbook from '../models/textbook';
import User from '../models/user';

const jwt = require('jsonwebtoken');

const express = require('express');

const router = express.Router();
/**
 * Method for returning all the current items in a user's cart.
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
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
 * Called when a user clicks add to cart on a given book.
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Success Status.
 */
router.post('/addToCart', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(401);
    } else {
      const arr = [req.body.data.bookID];
      User.update(
        { _id: authData.userInfo._id },
        {
          $addToSet: {
            cart: { $each: arr },
          },
        },
      );
    }
  });
  res.sendStatus(202);
});

/**
 * Called when a user clicks remove from cart on a book.
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Success Status.
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
          },
        );
        res.sendStatus(200);
      });
    }
  });
});


/**
 * Called when a user clicks clear cart on the cart page
 * currently not in use.
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Success Status.
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
  res.sendStatus(200);
});

/**
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books purchased by the user.
 */
router.post('/getPurchasedBooks', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
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
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books sold by the user.
 */
router.post('/getSoldBooks', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
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
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of notifications for the user.
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
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Stats for the user.
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

// Just in case this is needed
router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;

