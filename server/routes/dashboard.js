/**
 * @file All routes relating to the dashboard for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

// Import DB models
import Textbook from '../models/textbook';
import User from '../models/user';
import Transactions from '../models/transaction';

// JWT and Express
const jwt = require('jsonwebtoken');
const express = require('express');

const router = express.Router();

/**
 * Will return an array of JSON objects in reverse cronological order (Newest at the top)
 * @param {Array} JSONArray Array of books to sort.
 */
function sortReverseCronological(JSONArray) {
  JSONArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return JSONArray;
}

/**
 * Gets a list of all completed transactions (books with status 2).
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} List of completed transactions.
 */
router.get('/getPurchasedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 2 }, (err, books) => {
            res.status(200).json(sortReverseCronological(books));
          });
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
});

/**
 * Gets a list of all in process transactions (books with status 1).
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} List of transactions.
 */
router.get('/getTransactions/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 1 }, (err, books) => {
            res.status(200).json(sortReverseCronological(books));
          });
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
});

/**
 * Returns object of general stats form the DB.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} General statistics about BarterOut.
 */
router.get('/getStatistics/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else if (authData.userInfo.permissionType === 1) {
      let totalUsers;
      let totalBooks;
      User.count({}, (error, count) => {
        totalUsers = count;

        Textbook.count({}, (error, count) => {
          totalBooks = count;
          res.status(200).json({ totalUsers, totalBooks });
        });
      });
    } else {
      res.sendStatus(403);
    }
  });
});

/**
 * Gets a list of all currently users.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} List of users from DB.
 */
router.get('/getUsers/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          User.find({}, {
            password: 0, resetPasswordToken: 0, resetPasswordExpires: 0, notifications: 0, cart: 0,
          }, (err, users) => {
            res.status(200).json(users);
          });
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
});


/**
 * Sets the status of a given book to 2, confirming it.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/confirmBook', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else if (authData.userInfo.permissionType === 1) {
      Textbook.update(
        { _id: req.body.data.id },
        {
          $set:
            {
              status: 2,
            },
        }, (err) => {
          if (!err) {
            res.sendStatus(200);
          }
        },
      );
    } else {
      res.sendStatus(401);
    }
  });
});

router.get('/getCompletedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: 4, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            res.status(200).json(sortReverseCronological(books));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getInProcessBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: { $lt: 4 }, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            res.status(200).json(sortReverseCronological(books));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

/**
 * Sets the status of a given book to a given status.
 * Currenty NOT in use.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/setBookStatus/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that
          // will be for later when we have admin accounts
          Textbook.update(
            { _id: req.body.data.bookID },
            {
              $set:
                {
                  status: req.body.data.status,
                },
            },
          );
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      });
    }
  });
});

/**
 * Returns all books in the database with a status of 1.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/getPendingTransactions/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 0, // Finds all of the transactions of status 0 (pending)
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.sendStatus(403);
        }
      });
    }
  });
});


/**
 * Returns a list of all transaction object in the DB
 * Currently not in use.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.get('/getAllTransactions/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

/**
 * Returns all transaction schemas from database with status 1.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} Array of books from database.
 */
router.get('/getCompletedTransactions/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 1,
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.sendStatus(403);
        }
      });
    }
  });
});

router.get('/getPendingSpecificPendingTransaction/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 1,
          }, (err, transactionList) => {
            res.status(200).json(sortReverseCronological(transactionList));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});


router.post('/confirmTransaction', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          Transactions.update(
            { _id: req.body.data.id },
            {
              $set:
                {
                  status: 1,
                },
            }, (err) => {
              if (!err) {
                res.sendStatus(200);
              }
            },
          );
        } else {
          res.sendStatus(403);
        }
      });
    }
  });
});

router.get('/getTransactionsByName/:token/:firstName/:LastName', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          Transactions.find({
            $and: [
              { buyerFirstName: req.params.firstName },
              { buyerLastName: req.params.lastName },
            ],
          }, (err, transactions) => {
            res.json(sortReverseCronological(transactions));
          });
        } else {
          res.sendStatus(403);
        }
      });
    }
  });
});

/**
 * Returns a status code providing information on the permission
 * level of a given user.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.get('/isAdmin/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          res.sendStatus(200);
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
});

/**
 * Gets the permission level of a given user.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Contains permission level under permissionLevel.
 */
router.get('/permissionLv/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.userInfo.permissionType === 1) {
          res.sendStatus(200).json({ permissionType: 1 });
        } else {
          res.json({ permissionType: 0 });
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
