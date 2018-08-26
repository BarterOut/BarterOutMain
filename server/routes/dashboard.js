import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';
const jwt = require('jsonwebtoken');


const express = require('express');

const router = express.Router();

// will return an array of JSON objects in reverse cronological order (Newest at the top)
function sortBooksReverseCronological(bookJSONArray) {
  bookJSONArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return bookJSONArray;
}

router.post('/login', (req, res) => {
  if (req.body.data.emailAddress == 'development@barterout.com'
      && req.body.data.password == 'ourpassword') {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

router.get('/isAdmin/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          res.sendStatus(200);
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/permissionLv/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          res.sendStatus(200).json({ permissionType: 1 });
        } else {
          res.json({ permissionType: 0 });
        }
      });
    }
  });
});

router.get('/getPurchasedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          Textbook.find({ status: 2 }, (err, books) => {
            res.status(200).json(books);
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getTransactions/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          Textbook.find({ status: 1 }, (err, books) => {
            res.status(200).json(sortBooksReverseCronological(books));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.get('/getUsers/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          User.find({}, {
            password: 0, resetPasswordToken: 0, resetPasswordExpires: 0, notifications: 0, cart: 0,
          }, (err, users) => {
            res.status(200).json(users);
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

router.post('/confirmBook', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
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
          res.redirect('/home');
        }
      });
    }
  });
});


/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database. All of them!
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getAllBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            // Finds all of the books
          }, (err, books) => {
            User.findById(authData.userInfo._id, (err, user) => { //this search is not needed
              res.status(200).json(sortBooksReverseCronological(books));
            });
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database. All of them!
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getCompletedBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: 4, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            res.status(200).json(sortBooksReverseCronological(books));
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database. All of them!
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getInProcessBooks/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later
          Textbook.find({
            status: { $lt: 4 }, // Finds all of the books of status 4 (completed)
          }, (err, books) => {
            User.findById(authData.userInfo._id, (err, user) => { //this search is not needed
              res.status(200).json(sortBooksReverseCronological(books));
            });
          });
        } else {
          res.redirect('/home');
        }
      });
    }
  });
});

/**
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Updates the status of a book, requires book ID and the status to be set (number)
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.post('/setBookStatus/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (authData.permissionType === 1) {
          // check if permission is 1 where 1 is admin but that will be for later when we have admin accounts
          Textbook.update(
            { _id: req.body.data.bookID },
            {
              $set:
                {
                  status: req.body.data.status,
                },
            },
          );
          res.status(200);
        } else {
          res.redirect('/home');
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