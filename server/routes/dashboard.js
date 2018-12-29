/**
 * @file All routes relating to the dashboard for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

// Import DB models
import Textbook from '../models/textbook';
import User from '../models/user';
import Transactions from '../models/transaction';

import response from '../resources/response';

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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 2 }, (err, books) => {
            res.status(200).json(response(sortReverseCronological(books)));
          });
        } else {
          res.status(401).json(response({ error: 'Bad Permission.' }));
        }
      });
    }
  });
});

// We could add this thing where the parameter is the status we would like to search for

/**
 * Gets a list of all in process transactions (books with status 1).
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} List of transactions.
 */
router.get('/getBooksStatus1/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 1 }, (err, books) => {
            res.status(200).json(response(sortReverseCronological(books)));
          });
        } else {
          res.status(401).json(response({}));
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
router.get('/getBooksStatus2/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account.' }));
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 2 }, (err, books) => {
            res.status(200).json(response(sortReverseCronological(books)));
          });
        } else {
          res.status(401).json(response({}));
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
router.get('/getBooksStatus3/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          Textbook.find({ status: 3 }, (err, books) => {
            res.status(200).json(response(sortReverseCronological(books)));
          });
        } else {
          res.status(401).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType === 1) {
      let totalUsers;
      let totalBooks;
      User.countDocuments({}, (error, count) => {
        totalUsers = count;

        Textbook.countDocuments({}, (error, count) => {
          totalBooks = count;
          res.status(200).json(response({ totalUsers, totalBooks }));
        });
      });
    } else {
      res.status(403).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          User.find({}, {
            password: 0, resetPasswordToken: 0, resetPasswordExpires: 0, notifications: 0, cart: 0,
          }, (err, users) => {
            res.status(200).json(response(users));
          });
        } else {
          res.status(401).json(response({}));
        }
      });
    }
  });
});


/**
 * Get the info of the books and make them bigger
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/extendBookInfo', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType === 1) {
      const bookArray = req.body.data.books;
      const output = [];
      User.find({}, (error, users) => {
        for (let i = 0; i < bookArray.length; i++) {
          const newBook = bookArray[i];
          for (let j = 0; j < users.length; j++) {
            if (String(newBook.owner) === String(users[j]._id)) {
              newBook.ownerObject = users[j];
            } else if (String(newBook.buyer) === String(users[j]._id)) {
              newBook.buyerObject = users[j];
            }
          }
          output.push(newBook);
        }
        res.status(200).json(response(output));
      });
    } else {
      res.status(401).json(response({}));
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
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
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
            res.status(200).json(response({}));
          }
        },
      );
    } else {
      res.status(401).json(response({}));
    }
  });
});

/**
 * Sets the status of a given book to 3, confirming it's paid.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/setBookPaid', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType === 1) {
      Textbook.update(
        { _id: req.body.data.id },
        {
          $set:
            {
              status: 3,
            },
        }, (err) => {
          if (!err) {
            res.status(200).json(response({}));
          }
        },
      );
    } else {
      res.status(401).json(response({}));
    }
  });
});

router.get('/getCompletedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: 4, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            res.status(200).json(response(sortReverseCronological(books)));
          });
        } else {
          res.status(200).json(response({}));
        }
      });
    }
  });
});

router.get('/getInProcessBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: { $lt: 4 }, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            res.status(200).json(response(sortReverseCronological(books)));
          });
        } else {
          res.status(200).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(402).json(response({ error: 'You need to create an account' }));
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
          res.status(200).json(response({}));
        } else {
          res.status(403).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 0, // Finds all of the transactions of status 0 (pending)
          }, (err, transactionList) => {
            res.status(200).json(response(sortReverseCronological(transactionList)));
          });
        } else {
          res.status(403).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
          }, (err, transactionList) => {
            res.status(200).json(response(sortReverseCronological(transactionList)));
          });
        } else {
          res.status(200).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 1,
          }, (err, transactionList) => {
            res.status(200).json(response(sortReverseCronological(transactionList)));
          });
        } else {
          res.status(403).json(response({}));
        }
      });
    }
  });
});

router.get('/getPendingSpecificPendingTransaction/:token/', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Transactions.find({
            status: 1,
          }, (err, transactionList) => {
            res.status(200).json(response(sortReverseCronological(transactionList)));
          });
        } else {
          res.status(200).json(response({}));
        }
      });
    }
  });
});

router.post('/confirmTransaction', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
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
                res.status(200).json(response({}));
              }
            },
          );
        } else {
          res.status(403).json(response({}));
        }
      });
    }
  });
});

router.get('/getTransactionsByName/:token/:firstName/:LastName', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.permissionType === 1) {
          Transactions.find({
            $and: [
              { buyerFirstName: req.params.firstName },
              { buyerLastName: req.params.lastName },
            ],
          }, (err, transactions) => {
            res.json(response(sortReverseCronological(transactions)));
          });
        } else {
          res.status(403).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          res.status(200).json(response({}));
        } else {
          res.status(401).json(response({}));
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
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType === 1) {
          res.status(200).json(response({ permissionType: 1 }));
        } else {
          res.status(401).json(response({ permissionType: 0 }));
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
