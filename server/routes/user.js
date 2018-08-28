import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';

const jwt = require('jsonwebtoken');

const express = require('express');

const router = express.Router();

// Remakes matches based on the books in the request collection. *Needs testing*
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
      User.update(
        { _id: authData.userInfo._id },
        {
          $push: {
            cart: {
              $each: [req.body.data.bookID],
              $position: 0,
            },
          },
        }, (error) => {
          console.error(`Error: ${error}`);
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
          }, (err, raw) => {
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
 * @param {object} req Request from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books sold by the user.
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

/**
 * Removes a matching request for a given user.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Response status.
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
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
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

/**
 * Gets all the users in the server. ADMIN FUNCTION.
 * Finds all users and returns all fields except for the password and similar fields
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getAllUserData/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(400);
    } else if (authData.permissionType === 1){
      //check if it is an admin ie permissionType == 1
      User.find(
        { }, {
          password: 0, resetPasswordToken: 0, resetPasswordExpires: 0, notifications: 0, cart: 0,
        },
        (error, returnUsers) => {
          if (!returnUsers) {
            res.sendStatus(401);
          } else {
            res.status(200).json({
              users: returnUsers,
            });
          }
        },
      );
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

