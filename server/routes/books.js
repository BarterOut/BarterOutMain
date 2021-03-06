/**
 * @file books.js
 * @description All routes relating to books for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';
import Transaction from '../models/transaction';

import response from '../resources/response';
import Pricing from '../resources/pricing';

import auth from '../auth';

const express = require('express');

const router = express.Router();

const emails = require('../resources/emails');
const notification = require('../resources/notifications');

const BOOK_LIMIT = 40;

/**
 * [RESOURCE] Sends out all needs emails when a transaction occurs.
 * @param {String} transactionID ID of the transaction schema saved in the DB.
 */
function transactionEmail(transactionID) {
  Transaction.findOne({ _id: transactionID }, (err, transa) => {
    User.findOne({ _id: transa.buyerID }, (E, buyer) => {
      for (let i = 0; i < transa.booksPurchased.length; i++) {
        Textbook.findOne({ _id: transa.booksPurchased[i] }, (er, book) => {
          User.findOne({ _id: book.owner }, (error, seller) => {
            emails.sendEmail(emails.emailForUs(buyer, seller, book));
            emails.sendEmail(
              emails.emailToSeller(
                seller.emailAddress,
                seller.firstName,
                book.name,
              ),
            );
            emails.sendEmail(
              emails.venmoRequestEmail(
                buyer.emailAddress,
                buyer.firstName,
                book.name,
              ),
            );
          });
        });
      }
    });
  });
}

/**
 * @description User posts a book they want to sell.
 * @access Restricted
 */
function postBook(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const newBook = new Textbook(req.body.data);
  newBook.save()
    .then(() => {
      const theBookID = newBook._id;

      User.update(
        { _id },
        {
          $push: {
            notifications: {
              $each: [notification.thanksForPosting(newBook.name)],
              $position: 0,
            },
          },
        }, (error) => {
          console.error(`Error: ${error}`); // eslint-disable-line
        },
      );

      // update match with an and statment such that
      // it doesn't match with users that status other than 0
      TextbookBuy.find({
        $and: [
          {
            $or: [
              { name: { $regex: req.body.data.name, $options: 'i' } },
              { course: { $regex: req.body.data.course, $options: 'i' } },
            ],
          },
          { status: 0 },
          { owner: { $ne: _id } },
        ],
      }, (error, matchedBooks) => {
        if (error) {
          res.status(401).json(response({ error }));
          return;
        }
        matchedBooks.forEach((bookMatched) => {
          User.update(
            { _id: bookMatched.owner },
            {
              $addToSet: { matchedBooks: theBookID },
            },
          );
          User.find({ _id: bookMatched.owner }, (errr, userToEmail) => {
            if (userToEmail[0] == null) {
              res.redirect('/home'); // TODO: eliminate this redirect
              return;
            }
            const email = userToEmail[0].emailAddress;
            const { firstName } = userToEmail[0];
            emails.sendEmail(emails.matchFoundEmail(email, firstName, bookMatched.name));
          });
        });
      });
      res.status(200).json(response());
    })
    .catch((error) => {
      res.status(400).json(response({ error }));
    });
}

/**
 * @description User requests a book they want.
 * @access Restricted
 */
function requestBook(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const BOOK = req.body.data.payload;
  BOOK.date = Date.now();
  const newBook = new TextbookBuy(BOOK);
  newBook.save()
    .then(() => {
      User.update(
        { _id },
        {
          $push: {
            notifications: {
              $each: [notification.postedRequest(newBook.name)],
              $position: 0,
            },
          },
        }, (error) => {
          console.error(`Error: ${error}`); // eslint-disable-line
        },
      );

      Textbook.find(
        { // looks for a book that matches based on the name matching or the course
          $and: [
            { status: 0 },
            {
              $or: [
                { name: { $regex: BOOK.name, $options: 'i' } },
                { course: { $regex: BOOK.course, $options: 'i' } },
              ],
            },
            { owner: { $ne: _id } },
          ],
        },
        (err, matchedBooks) => {
          const addBooks = [];
          matchedBooks.forEach((book) => {
            addBooks.push(book._id);
          });
          if (addBooks.length !== 0) {
            User.find({ _id: BOOK.owner }, (error, userToEmail) => {
              const email = userToEmail[0].emailAddress;
              const { firstName } = userToEmail[0];
              emails.sendEmail(emails.matchFoundEmail(email, firstName, BOOK.name));
            });
          }
          User.update(
            { _id: BOOK.owner },
            {
              $addToSet: {
                matchedBooks: { $each: addBooks },
              },
            }, (error) => {
              console.error(`Error: ${error}`); // eslint-disable-line
            },
          );
        },
      );
    })
    .catch((err) => {
      res.status(400).json(response({ error: err }));
    });
  res.status(200).json(response());
}

/**
 * @description User checks out of cart.
 * @access Restricted
 */
router.post('/checkoutCart', auth.required, (req, res) => {
  const { payload: { userInfo: { _id } } } = req;
  let buyer;
  let bookFound;
  let totalCharged = 0;

  User.find({ _id }, (error, foundUser) => {
    if (error) {
      res.status(401).json(response({ error }));
      return;
    }

    [buyer] = foundUser;

    for (let i = 0; i < req.body.data.cart.length; i++) {
      // Updates the user
      User.update(
        { _id },
        { $inc: { numberOfBooksBought: 1 } }, (error) => {
          console.error(`Error: ${error}`); // eslint-disable-line
        },
      );

      Textbook.update(
        { _id: req.body.data.cart[i]._id },
        { $set: { status: 1, buyer: _id } }, (error) => {
          console.error(`Error: ${error}`); // eslint-disable-line
        },
      );

      // Updates the books being sought by the user that match the query
      Textbook.find(
        { _id: req.body.data.cart[i]._id },
        (errors, foundBook) => {
          [bookFound] = foundBook;
          totalCharged += bookFound.price;

          // Set status of requested book if they exist
          TextbookBuy.update({
            $and: [
              { status: 0 },
              {
                $or: [
                  { name: bookFound.name },
                  { course: bookFound.course },
                ],
              },
              { owner: _id },
            ],
          }, { $set: { status: 1 } }, (error) => {
            console.warn(`Error in finding book being bought: ${error}`); // eslint-disable-line
          });

          // FOR SELLER USER STATISTICS
          User.update(
            { _id: bookFound.owner },
            { $inc: { numberOfBooksSold: 1, moneyMade: bookFound.price } }, (error) => {
              console.error(`Error update seller: ${error}`); // eslint-disable-line
            },
          );

          // For this specific book, find seller
          if (i === req.body.data.cart.length - 1) {
            const newTransaction = new Transaction({
              buyerID: buyer._id,
              buyerFirstName: buyer.firstName,
              buyerLastName: buyer.lastName,
              buyerVenmo: buyer.venmoUsername,
              buyerEmail: buyer.emailAddress,
              totalCharged: totalCharged + (totalCharged * Pricing.FEE),
              booksPurchased: req.body.data.cart,
            });
            newTransaction.save()
              .then(() => {
                transactionEmail(newTransaction._id);
              });
          }
        },
      );
    }
  });
  // Clear the user's cart
  User.update(
    { _id },
    {
      $set:
        {
          cart: [],
        },
    }, (error) => {
      if (error) {
        res.status(400).json(response({ error }));
      }
    },
  );
  res.status(200).json(response());
});

/**
 * @description Gets all books in given users matched books array.
 * @access Restricted
 */
function getUserMatches(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (error, user) => {
    if (!user) {
      res.status(401).json(response({ error: 'You need to create an account' }));
    } else {
      let bookObjects = [];
      const bookIDs = user.matchedBooks;
      Textbook
        .find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] })
        .sort({ date: -1 })
        .exec((error, books) => {
          bookObjects = books;
          for (let i = 0; i < bookObjects.length; i++) {
            for (let x = 0; x < user.cart.length; x++) {
              if (String(bookObjects[i]._id) === String(user.cart[x])) {
                bookObjects[i].status = 42;
              }
            }
          }
          bookObjects = books;
          res.status(200).json(response(bookObjects));
        });
    }
  });
}

/**
 * @description Finds all books in database with a matching name, course or ISBN.
 * Excluding the books posted by the user searching.
 * @access Restricted
 */
function searchRestricted(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const searchKey = req.params.query;
  const parsed = Number.parseInt(searchKey, 10);
  if (Number.isNaN(parsed)) {
    Textbook.find({
      $and: [
        { status: 0 },
        { owner: { $ne: _id } },
        {
          $or: [
            { name:   { $regex: searchKey, $options: 'i' } },
            { course: { $regex: searchKey, $options: 'i' } },
          ],
        },
      ],
    }, (err, books) => {
      res.status(200).json(response(books));
    });
  } else {
    Textbook
      .find({
        $and: [
          { status: 0 },
          { owner: { $ne: _id } },
          {
            $or: [
              { name:   { $regex: searchKey, $options: 'i' } },
              { course: { $regex: searchKey, $options: 'i' } },
              { ISBN:   { $eq: parsed } },
            ],
          },
        ],
      })
      .sort({ date: -1 })
      .exec((error, books) => {
        if (!error) {
          res.status(200).json(response(books));
        } else { res.status(400).json(response({ error })); }
      });
  }
}

/**
 * @description Finds all books in database with a
 * matching name, course or ISBN.
 * NO TOKEN
 * @access Public
 */
function search(req, res) {
  const searchKey = req.params.query;
  const parsed = Number.parseInt(searchKey, 10);
  if (Number.isNaN(parsed)) {
    Textbook.find({
      $and: [
        { status: 0 },
        {
          $or: [
            { name:   { $regex: searchKey, $options: 'i' } },
            { course: { $regex: searchKey, $options: 'i' } },
          ],
        },
      ],
    }, (err, books) => {
      res.status(200).json(response(books));
    });
  } else {
    Textbook
      .find({
        $and: [
          { status: 0 },
          {
            $or: [
              { name:   { $regex: searchKey, $options: 'i' } },
              { course: { $regex: searchKey, $options: 'i' } },
              { ISBN:   { $eq: parsed } },
            ],
          },
        ],
      })
      .sort({ date: -1 })
      .exec((err, books) => {
        res.status(200).json(response(books));
      });
  }
}

/**
 * @description Returns all of a given users posts.
 * @access Restricted
 */
function getUserPosts(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  Textbook.find({
    $and: [
      { $or: [{ status: 0 }, { status: 5 }] },
      { owner: _id },
    ],
  }, (err, books) => {
    const bookMap = [];
    books.forEach((book) => {
      bookMap.push(book);
    });
    res.status(200).json(response(bookMap));
  });
}

/**
 * @description Removes a book up for sale
 * from the database.
 * @access Restricted
 */
function deleteBook(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  Textbook.deleteOne({
    $and: [
      { _id: req.body.data.bookID },
      { owner: _id },
    ],
  }, (error) => {
    if (!error) {
      res.status(200).json(response());
    } else {
      res.status(400).json(response({ error }));
    }
  });
}

/**
 * @description Gets all books being sold from database
 * and that are not from the user.
 * @access Restricted
 */
function getAllBooks(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  Textbook
    .find({
      $and: [
        { status: 0 },
        { owner: { $ne: _id } }],
    })
    .limit(BOOK_LIMIT)
    .sort({ date: -1 })
    .exec((err, books) => {
      User.findById(_id, (err, user) => {
        const booksList = books;
        for (let i = 0; i < booksList.length; i++) {
          for (let x = 0; x < user.cart.length; x++) {
            if (booksList[i]._id === user.cart[x]) {
              booksList[i].status = 42;
            }
          }
        }
        res.status(200).json(response(booksList));
      });
    });
}

/**
 * @description Returns given limit books in
 * the database, without requiring a token.
 * NOTE: This will display posts to a user that they
 * posted.
 * @access Public
 */
function getBooksNoToken(req, res) {
  const { params: { limit } } = req;
  const { params: { skip } } = req;
  const data = { limit, skip };
  generalGetBooks(data)
    .then(books => res.status(200).json(response(books)));
}
/**
 * @description Returns given limit books in
 * the database, optionally requiring a token.
 * @param data {skip, limit, userID::optional}
 * @returns Promise
 */
function generalGetBooks(data) {
  const offset = data.skip == null ? 0 : parseInt(data.skip, 10);
  const limit = data.limit == null ? BOOK_LIMIT : parseInt(data.limit, 10);
  const query = (data.userID == null)
    ? { status: 0 }
    : {
      $and: [
        { status: 0 },
        { owner: { $ne: data.userID } },
      ],
    };

  return Textbook
    .find(query)
    .sort({ date: -1 })
    .limit(limit, 10)
    .skip(offset * limit);
}


/**
 * @description Updates the status of an old book
 * @access Restricted
 */
function reactivateBook(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  Textbook.update({
    $and: [
      { _id: req.body.data.bookID },
      { owner: _id },
    ],
  },
  {
    $set: { status: 0 },
  }, (error) => {
    if (!error) {
      res.status(200).json(response());
    } else {
      res.status(400).json(response({ error }));
    }
  });
}

function booksBase(req, res) {
  res.status(200).json(response());
}

router.get('/', booksBase);
router.get('/getBooksNoToken/:limit/:skip', getBooksNoToken);
router.get('/getAllBooks', auth.required, getAllBooks);
router.get('/search/public/:query', search);
router.get('/search/:query', auth.required, searchRestricted);
router.get('/getUsersPosts', auth.required, getUserPosts);
router.get('/getUserMatches', auth.required, getUserMatches);

router.post('/deleteBook', auth.required, deleteBook);
router.post('/reactivateBook', auth.required, reactivateBook);
router.post('/postBook', auth.required, postBook);
router.post('/requestBook', auth.required, requestBook);

module.exports = router;
