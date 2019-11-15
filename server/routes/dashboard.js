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

const router = express.Router();
const emails = require('../resources/emails');

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
 * @description Gets a list of all completed
 * transactions (books with status 2).
 * @access Restricted
 */
function getPurchasedBooks(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (permissionType > 0) {
    Textbook
      .find({ status: 2 })
      .sort({ date: -1 })
      .exec((error, books) => {
        res.status(200).json(response(books));
      });
  }
}

/**
 * @description Gets a list of all in process transactions
 * (books with status: status).
 * @access Restricted
 */
function getBooksWithStatus(req, res) {
  // we are using base 10
  const status = parseInt(req.params.status, 10);
  const { VALID_STATUSES } = config;
  const { payload: { userInfo: { permissionType } } } = req;

  if (!Object.values(VALID_STATUSES).includes(status)) {
    res.status(400).json(response({ error: `Invalid status: ${status}` }));
  }

  if (auth.isAdmin(permissionType)) {
    Textbook
      .find({ status })
      .sort({ date: -1 })
      .exec((error, books) => {
        res.status(200).json(response(books));
      });
  } else {
    res.status(401).json(response({}));
  }
}


/**
 * @description Returns object of general stats form the DB.
 * @access Restricted
 */
function getStatistics(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
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
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

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
      }, (error, users) => {
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
 * @description Sets the status of a given book to 2, confirming it.
 * @access Restricted
 */
function confirmBook(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    Textbook.update(
      { _id: req.body.data.id },
      { $set: { status: 2 } }, (err) => {
        if (!err) {
          res.status(200).json(response({}));
        }
      },
    );
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

/**
 * @description Sets the status of a given book
 * to 3, confirming it's paid.
 * @access Restricted
 */
function setBookPaid(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    Textbook.update(
      { _id: req.body.data.id },
      { $set: { status: 3 } }, (err) => {
        if (!err) {
          res.status(200).json(response({}));
        }
      },
    );
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

/**
 * @description Sets the status of a given book to a given status.
 * Currenty NOT in use.
 * @access Restricted
 */
function setBookStatus(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    // check if permission is 1 where 1 is admin but that
    // will be for later when we have admin accounts
    Textbook.update(
      { _id: req.body.data.bookID },
      { $set: { status: req.body.data.status } },
    );
    res.status(200).json(response({}));
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

/**
 * @description Returns a list of all transaction objects in the DB
 * that have a status of pending
 * Currently not in use.
 * @access Restricted
 */
function getPendingTransactions(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    // check if permission is 1 where 1 is admin but that will be for later
    Transactions
      .find({ status: 0 })
      .sort({ date: -1 })
      .exec((error, transactionList) => {
        res.status(200).json(response(transactionList));
      });
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}


/**
 * @description Returns a list of all transaction objects in the DB
 * Currently not in use.
 * @access Restricted
 */
function getAllTransactions(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    // check if permission is 1 where 1 is admin but that will be for later
    Transactions
      .sort({ date: -1 })
      .exec((error, transactionList) => {
        res.status(200).json(response(transactionList));
      });
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

/**
 * @description Returns all transaction schemas
 * from database with status 1.
 * @access Restricted
 */
function getCompletedTransactions(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    Transactions
      .find({ status: 1 })
      .sort({ date: -1 })
      .exec((error, transactionList) => {
        res.status(200).json(response(transactionList));
      });
  } else {
    res.status(403).json(response({ error: 'Unauthorized' }));
  }
}

/**
 * @description Move a transcaction from
 * status 0, to status 1.
 * @access Restricted
 */
function confirmTransaction(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
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
}

/**
 * @description Returns all Transactions of a given user
 * (the Transaction Schema)
 * @access Restricted
 */
function getTranscationsByName(req, res) {
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    Transactions
      .find({
        $and: [
          { buyerFirstName: req.params.firstName },
          { buyerLastName: req.params.lastName },
        ],
      })
      .sort({ date: -1 })
      .exec((error, transactions) => {
        res.json(response(transactions));
      });
  } else {
    res.status(403).json(response({}));
  }
}

/**
 * @description Returns a status code providing
 * information on the permission level of a given user.
 * @access Restricted
 */
function isAdmin(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const { payload: { userInfo: { permissionType } } } = req;
  User.findOne({ _id }, (error, user) => {
    if (!user) {
      res.status(401).json(response({ error: 'You need to create an account' }));
    } else if (auth.isAdmin(permissionType)) {
      res.status(200).json(response({}));
    } else {
      res.status(403).json(response({ error: 'Unauthorized' }));
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
  const { payload: { userInfo: { permissionType } } } = req;
  if (auth.isAdmin(permissionType)) {
    let usersToEmail = [];
    let booksToDeactivate = [];
    Textbook.find({}, (error, books) => {
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
      User.find({ _id: { $in: usersToEmail } }, (error, users) => {
        for (let i = 0; i < users.length; i++) {
          emails.sendEmail(emails.deactivatedBook(users[i].emailAddress, users[i].firstName));
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
  if (auth.isOwner(permissionType)) {
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
router.get('/permissionLv', auth.required, permissionLevel);
router.get('/isAdmin', auth.required, isAdmin);
router.get('/getUsers', auth.required, getUsers);
router.get('/getTransactionsByName/:firstName/:LastName', auth.required, getTranscationsByName);
router.get('/getPurchasedBooks', auth.required, getPurchasedBooks);
router.get('/getCompletedTransactions', auth.required, getCompletedTransactions);
router.get('/getAllTransactions', auth.required, getAllTransactions);
router.get('/getPendingTransactions', auth.required, getPendingTransactions);
router.get('/getStatistics', auth.required, getStatistics);
router.get('/getBooksWithStatus/:status', auth.required, getBooksWithStatus);

router.put('/makeAdmin', auth.required, makeAdmin);

router.post('/deactivateBooks', auth.required, deactivateBooks);
router.post('/confirmTransaction', auth.required, confirmTransaction);
router.post('/setBookPaid', auth.required, setBookPaid);
router.post('/confirmBook', auth.required, confirmBook);
router.post('/setBookStatus', setBookStatus);

module.exports = router;
