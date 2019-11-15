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
import config from '../config';
import auth from '../auth';

// JWT and Express
const jwt = require('jsonwebtoken');
const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();
const emails = require('../resources/emails');

/**
 * Will return an array of JSON objects in reverse cronological order (Newest at the top)
 * @param {Array} JSONArray Array of books to sort.
 */
function sortReverseCronological(JSONArray) {
  JSONArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return JSONArray;
}

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.NEV_CLIENT_SECRET,
  },
});

function sendEmail(mailOptions) {
  console.log(transporter.options.auth); // eslint-disable-line
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error(`Error: ${error}`);
    }
  });
}

/**
 * Updates the status of the given array of books to status
 * @param {Array} books Array books to update
 * @param {Number} status Valid book status
 */
function setBooksStatus(books, status) {
  Textbook.updateMany({ _id: { $in: books } }, { $set: { status } }, () => {});
}

/**
 * Adds a value to an array if not a duplicate
 * @param {Array} array Array to add to
 * @param {Any} val Value to add to array
 */
function addNoDuplicates(array, val) {
  if (!array.includes(val)) { array.push(val); }
  return array;
}

/**
 * Gets a list of all completed transactions (books with status 2).
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} List of completed transactions.
 */
router.get('/getPurchasedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType > 0) {
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

/**
 * Gets a list of all in process transactions (books with status, status).
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Array} List of transactions.
 */
router.get('/getBooksWithStatus/:status/:token', (req, res) => {
  // we are using base 10
  const status = parseInt(req.params.status, 10);
  const { VALID_STATUSES } = config;
  if (!Object.values(VALID_STATUSES).includes(status)) {
    res.status(400).json(response({ error: `Invalid status: ${status}` }));
  }

  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account.' }));
        } else if (authData.userInfo.permissionType > 0) {
          Textbook
            .find({ status })
            .sort({ date: -1 })
            .exec((err, books) => {
              res.status(200).json(response(books));
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
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType > 0) {
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
 * @description Gets a list of all currently users.
 * @access Restricted
 */
function getUsers(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const { payload: { userInfo: { permissionType } } } = req;
  User.findOne({ _id }, (error, user) => {
    if (!user) {
      res.status(401).json(response({ error: 'You need to create an account' }));
    } else if (permissionType > 0) {
      // clean out private data for response
      User.find({}, {
        password: 0,
        resetPasswordToken: 0,
        resetPasswordExpires: 0,
        notifications: 0,
        cart: 0,
      }, (err, users) => {
        res.status(200).json(response(users));
      });
    } else {
      res.status(401).json(response({}));
    }
  });
}


/**
 * Get the info of the books and make them bigger
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/extendBookInfo', (req, res) => {
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType > 0) {
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
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType > 0) {
      Textbook.update(
        { _id: req.body.data.id },
        { $set: { status: 2 } }, (err) => {
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
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else if (authData.userInfo.permissionType > 0) {
      Textbook.update(
        { _id: req.body.data.id },
        { $set: { status: 3 } }, (err) => {
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
 * Sets the status of a given book to a given status.
 * Currenty NOT in use.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/setBookStatus/:token', (req, res) => {
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(402).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType > 0) {
          // check if permission is 1 where 1 is admin but that
          // will be for later when we have admin accounts
          Textbook.update(
            { _id: req.body.data.bookID },
            { $set: { status: req.body.data.status } },
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
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType > 0) {
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
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType > 0) {
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
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType > 0) {
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
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.userInfo.permissionType > 0) {
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
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.permissionType > 0) {
          Transactions.update(
            { _id: req.body.data.id },
            { $set: { status: 1 } }, (err) => {
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
  jwt.verify(req.params.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).json(response({ error: 'You need to create an account' }));
        } else if (authData.permissionType > 0) {
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
 * @description Returns a status code providing
 * information on the permission level of a given user.
 * @access Restricted
 */
function isAdmin(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const { payload: { userInfo } } = req;
  User.findOne({ _id }, (error, user) => {
    if (!user) {
      res.status(401).json(response({ error: 'You need to create an account' }));
    } else if (userInfo.permissionType > 0) {
      res.status(200).json(response({}));
    } else {
      res.status(401).json(response({}));
    }
  });
}

/**
 * @description Gets the permission level
 * of a given user.
 * @access Restricted
 */
function permissionLevel(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  res.status(200).json(response({ permissionType }));
}

/**
 * @description Unlists old books and emails users,
 * prompting them to re-list or delete the book.
 * @access Restricted
 */
function deactivateBooks(req, res) {
  const { payload: { userInfo } } = req;
  if (userInfo.permissionType > 0) {
    let usersToEmail = [];
    let booksToDeactivate = [];
    Textbook.find({}, (err, books) => {
      for (let i = 0; i < books.length; i++) {
        const bookDate = books[i].date;
        const twoMonthsInDays = 62;
        const twoMonthsInMS = twoMonthsInDays * 24 * 60 * 60 * 1000;
        if (bookDate < (Date.now() - twoMonthsInMS) && books[i].status === 0) {
          // add the books to list of people to email
          booksToDeactivate = addNoDuplicates(booksToDeactivate, `${books[i]._id}`);
          usersToEmail = addNoDuplicates(usersToEmail, books[i].owner);
        }
      }

      setBooksStatus(booksToDeactivate, 5);
      User.find({ _id: { $in: usersToEmail } }, (er, users) => {
        for (let i = 0; i < users.length; i++) {
          sendEmail(emails.deactivatedBook(users[i].emailAddress, users[i].firstName));
        }
        res.status(200).json(response({}));
      });
    });
  } else {
    res.status(403).json(response({}));
  }
}

/**
 * @description Makes the given user an owner (highest permission)
 * (permission type 2)
 * @access Restricted
 */
function makeAdmin(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  const { body: { data: { userID } } } = req;
  if (permissionType === 2) {
    User.updateOne({ _id: userID }, { permissionType: 1 })
      .then(() => {
        res.status(200).json(response(userID));
      });
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

function dashboardBase(req, res) {
  res.status(200).json(response({}));
}

router.get('/', dashboardBase);
router.put('/makeAdmin', auth.required, makeAdmin);
router.post('/deactivateBooks', auth.required, deactivateBooks);
router.get('/permissionLv/:token', auth.required, permissionLevel);
router.get('/isAdmin/:token', auth.required, isAdmin);
router.get('/getUsers/:token', auth.required, getUsers);

module.exports = router;
