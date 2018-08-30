/**
 * @file Routes relating to books for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';
import Transaction from '../models/transaction';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

const emails = require('../emails/emailFunctions');

const notification = require('../Notifications');

const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
    clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
  },
});

function transactionEmail(transactionID) {
  console.log('in function');
  Transaction.findOne({ _id: transactionID }, (err, transa) => {
    console.log('found');
    User.findOne( {_id: transa.buyerID}, (E, buyer) =>{
      for (let i = 0; i < transa.booksPurchased.length; i++) {
        Textbook.findOne({ _id: transa.booksPurchased[i] }, (er, book) => {
          User.findOne({ _id: book.owner }, (E, seller) => {
            console.log(seller);
            console.log(book);
            console.log('sending');
            sendEmail(emails.emailForUs(buyer, seller, book));
            sendEmail(emails.emailToSeller(seller.emailAddress, seller.firstName, book.name));
            sendEmail(emails.venmoRequestEmail(buyer.emailAddress, buyer.firstName, book.name));
          });
        });
      }

    });

  });

}


function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.info(info);
    }
  });
}

// will return an array of JSON objects in reverse cronological order (Newest at the top)
function sortBooksReverseCronological(bookJSONArray) {
  bookJSONArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return bookJSONArray;
}

/**
 * Called when a user posts a book they want to sell.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {String} Status Code
 */
router.post('/postBook/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (err, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else if (err) {
          res.status(401).send(err);
        } else {
          const newBook = new Textbook(req.body.data);
          newBook.save()
            .then(() => {
              const theBookID = newBook._id;

              User.update(
                { _id: authData.userInfo._id },
                {
                  $push: {
                    notifications: {
                      $each: [notification.thanksForPosting(newBook.name)],
                      $position: 0,
                    },
                  },
                }, (error) => {
                  console.error(`Error: ${error}`);
                },
              );

              // update match with an and statment such that
              // it doesn't match with users that status other than 0
              TextbookBuy.find({
                $and: [
                  { $or: [{ name: { $regex: req.body.data.name, $options: 'i' } }, { course: { $regex: req.body.data.course, $options: 'i' } }] },
                  { status: 0 },
                  { owner: { $ne: authData.userInfo._id } },

                ],
              }, (er, matchedBooks) => {
                if (er) {
                  res.status(401).send(er);
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
                      res.redirect('/home');
                      return;
                    }
                    const email = userToEmail[0].emailAddress;
                    const firstName = userToEmail[0].firstName;
                    sendEmail(emails.matchFoundEmail(email, firstName, bookMatched.name));
                  });
                });
              });
              res.status(200).send();
            })
            .catch((e) => {
              res.status(400).send(e);
            });
        }
      });
    }
  });
});

/**
 * Called when a user posts a request for a book they want to buy.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.post('/requestBook', (req, res) => {
  const BOOK = req.body.data.payload;
  const TOKEN = req.body.data.token;
  jwt.verify(TOKEN, 'secretKey', (errr, authData) => {
    if (errr) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (er, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else {
          BOOK.date = Date.now();
          const newBook = new TextbookBuy(BOOK);
          newBook.save()
            .then(() => {
              User.update(
                { _id: authData.userInfo._id },
                {
                  $push: {
                    notifications: {
                      $each: [notification.postedRequest(newBook.name)],
                      $position: 0,
                    },
                  },
                }, (error) => {
                  console.error(`Error: ${error}`);
                },
              );

              Textbook.find(
                { // looks for a book that matches based on the name matching or the course
                  $and: [
                    { status: 0 },
                    { $or: [{ name: { $regex: BOOK.name, $options: 'i' } }, { course: { $regex: BOOK.course, $options: 'i' } }] },
                    { owner: { $ne: authData.userInfo._id } },
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
                      const firstName = userToEmail[0].firstName;
                      sendEmail(emails.matchFoundEmail(email, firstName, BOOK.name));
                    });
                  }
                  User.update(
                    { _id: BOOK.owner },
                    {
                      $addToSet: {
                        matchedBooks: { $each: addBooks },
                      },
                    }, (error) => {
                      console.error(`Error: ${error}`);
                    },
                  );
                },
              );
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      });
    }
    res.sendStatus(200);
  });
});

/**
 * Called when user checks out of cart.
 * @param {object} req Request body from client.
 * @param {object} res Body of HTTP response.
 * @returns {status} Response status.
 */
router.post('/checkoutCart/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      let buyer;
      let bookFound;
      let totalCharged = 0;

      User.find({ _id: authData.userInfo._id }, (e, foundUser) => {
        if (e) {
          res.status(401).send(e);
          return;
        }

        buyer = foundUser[0];

        User.update(
          { _id: authData.userInfo._id },
          { $inc: { numberOfBooksBought: 1 } }, (error) => {
            console.error(`Error: ${error}`);
          },
        );
        for (let i = 0; i < req.body.data.cart.length; i++) {
          // This part works
          Textbook.update(
            { _id: req.body.data.cart[i]._id },
            { $set: { status: 1, buyer: authData.userInfo._id } }, (error) => {
              console.error(`Error: ${error}`);
            },
          );

          // updates the books being sought by the user that match the query
          Textbook.find({ _id: req.body.data.cart[i]._id }, (errors, foundBook) => {
            bookFound = foundBook[0];
            totalCharged += bookFound.price;

            // Set status of requested book if they exist
            TextbookBuy.update({
              $and: [{ status: 0 }, { $or: [{ name: bookFound.name }, { course: bookFound.course }] },
                { owner: authData.userInfo._id }],
            }, { $set: { status: 1 } }, (error) => {
              console.warn(`Error in finding book being bought: ${error}`);
            });

            // FOR SELLER USER STATISTICS
            User.update(
              { _id: bookFound.owner },
              { $inc: { numberOfBooksSold: 1, moneyMade: bookFound.price } }, (error) => {
                console.error(`Error update seller: ${error}`);
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
                totalCharged,
                booksPurchased: req.body.data.cart,
              });
              newTransaction.save()
              .then(() => {
                transactionEmail(newTransaction._id);
              });
            }
          });
        }
      });
      // clear the cart
      User.update(
        { _id: authData.userInfo._id },
        {
          $set:
            {
              cart: [],
            },
        }, (error) => {
          console.log(`Error: ${error}`);
        },
      );

      res.sendStatus(200);
    }
  });
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.get('/getUserMatches/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({ error: 'You need to create an account' });
        } else {
          User.find({ _id: authData.userInfo._id }, (err, userMatch) => {
            let bookObjects = [];
            const bookIDs = userMatch[0].matchedBooks;
            Textbook.find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] }, (error, books) => {
              bookObjects = books;
              res.json(bookObjects);
            });
          });
        }
      });
    }
  });
});

/**
 * Finds all books in database with a matching name, course or ISBN.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/search/:query/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const searchKey = req.params.query;
      // console.log("search " + searchKey + " " + authData.userInfo._id);

      const parsed = Number.parseInt(searchKey, 10);
      if (Number.isNaN(parsed)) {
        Textbook.find({
          $and: [
            { status: 0 },
            { owner: { $ne: authData.userInfo._id } },
            {
              $or: [
                { name: { $regex: searchKey, $options: 'i' } },
                { course: { $regex: searchKey, $options: 'i' } },
              ],
            },
          ],
        }, (err, books) => {
          res.status(200).json(books);
        });
      } else {
        Textbook.find({
          $and: [
            { status: 0 },
            { owner: { $ne: authData.userInfo._id } },
            {
              $or: [
                { name: { $regex: searchKey, $options: 'i' } },
                { course: { $regex: searchKey, $options: 'i' } },
                { ISBN: { $eq: parsed } },

              ],
            },
          ],
        }, (err, books) => {
          res.status(200).json(books);
        });
      }
    }
  });
});

/**
 * Returns all of a given users posts.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/getUsersPosts/:token', (req, res) => {
  jwt.verify(req.params.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Textbook.find({
        $and: [
          { status: 0 },
          { owner: authData.userInfo._id },
        ],
      }, (err, books) => {
        const bookMap = [];
        books.forEach((book) => {
          bookMap.push(book);
        });
        res.status(200).json(bookMap);
      });
    }
  });
});

/**
 * Removes a book up for sale from the database.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.post('/deleteBook/', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      Textbook.deleteOne({
        $and: [
          { _id: req.body.data.bookID },
          { owner: authData.userInfo._id },
        ],
      }, (error) => {
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
 * @deprecated Due to inefficiency (still in use but needs changing)
 * Gets all books being sold from database and that are not from the user.
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
        } else {
          Textbook.find({
            $and: [
              { status: 0 },
              { owner: { $ne: authData.userInfo._id } }],
          }, (err, books) => {
            User.findById(authData.userInfo._id, (err, user) => {
              for (let i = 0; i < books.length; i++) {
                for (let x = 0; x < user.cart.length; x++) {
                  if (books[i]._id == user.cart[x]) {
                    books[i].status = 3;
                  }
                }
              }
              res.status(200).json(sortBooksReverseCronological(books));
            });
          });
        }
      });
    }
  });
});


/**
 * Called when user buys book.
 * @deprecated
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
// router.post('/clickBuy/:token', (req, res) => {
//   jwt.verify(req.params.token, 'secretKey', (error, authData) => {
//     if (error) {
//       res.sendStatus(403);
//     } else {
//       User.findOne({ _id: authData.userInfo._id }, (error, user) => {
//         if (!user) {
//           res.status(401).send({ error: 'You need to create an account' });
//         } else {
//           let buyer;
//           let bookFound;
//           let seller;

//           User.find({ _id: req.body.userID }, (e, foundUser) => {
//             if (e) {
//               res.status(401).send(e);
//               return;
//             }
//             buyer = foundUser[0];
//             Textbook.update({ _id: req.body.bookID }, { $set: { status: 1 } }, (error) => {
//               console.log(`Error: ${error}`);
//             });
//             Textbook.find({ _id: req.body.bookID }, (errors, foundBook) => {
//               bookFound = foundBook[0];
//               TextbookBuy.update({
//                 $and: [{ status: 0 }, { $or: [{ name: bookFound.name }, { course: bookFound.course }] },
//                   { owner: req.body.userID }],
//               }, { $set: { status: 1 } }, (error) => {
//                 console.log(`Error in finding book being bought:  ${error}`);
//               });
//               User.find({ _id: bookFound.owner }, (error, sellerUser) => {
//                 seller = sellerUser[0];
//                 sendEmail(emails.emailForUs(buyer, seller, bookFound));
//                 sendEmail(emails.emailToSeller(seller.emailAddress, seller.firstName, bookFound.name));
//                 sendEmail(emails.venmoRequestEmail(buyer.emailAddress, buyer.firstName, bookFound.name));
//               });
//             });
//           });
//           res.json(true);
//         }
//       });
//     }
//   });
// });

router.get('/', (req, res) => {
  res.sendStatus(200);
});


module.exports = router;
