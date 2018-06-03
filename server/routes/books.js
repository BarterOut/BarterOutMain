import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import realUser from '../models/newUser';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

const emails = require('../emails/emailFunctions');


const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
    clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
  },
});


function sendEmail(mailOptions) {
  console.log('Sending the email!');
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.warn(err);
    } else {
      console.info(info);
    }
  });
}

router.post('/sellBook', (req, res) => {
  console.log('User Selling Book');
  req.body.payload.date = Date.now();
  const newBook = new Textbook(req.body.payload);
  newBook.save()
    .then(() => {
      console.log('Saved Book to DBemails');

      const theBookID = newBook._id;
      // update match with an and statment such that
      // it doesn't match with users that status other than 0
      TextbookBuy.find({
        $and: [
          { $or: [{ name: { $regex: req.body.payload.name, $options: 'i' } }, { course: { $regex: req.body.payload.course, $options: 'i' } }] },
          { status: 0 },
        ],
      }, (err, matchedBooks) => {
        matchedBooks.forEach((bookMatched) => {
          realUser.update({ _id: bookMatched.owner }, { $addToSet: { matchedBooks: theBookID } });
          realUser.find({ _id: bookMatched.owner }, (error, userToEmail) => {
            if (userToEmail[0] == null) {
              res.redirect('/home');
              return;
            }
            sendEmail(emails.matchFoundEmail(userToEmail[0].emailAddress, userToEmail[0].firstName, bookMatched.name));
          });
        });
      });
      res.redirect('/home');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

/**
 * Called when a user posts a book they want to buy.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.post('/buyBook', (req, res) => {
  console.info('User posting book to Buy');

  req.body.payload.date = Date.now();
  const newBook = new TextbookBuy(req.body.payload);
  newBook.save()
    .then(() => {
      console.info('Book was saved to DB');

      Textbook.find(
        { // looks for a book that matches based on the name matching and the
          $and: [
            { status: 0 },
            { $or: [{ name: { $regex: req.body.payload.name, $options: 'i' } }, { course: { $regex: req.body.payload.course, $options: 'i' } }] },
          ],
        },
        (err, matchedBooks) => {
          console.log('Book was found in matching.');

          const addBooks = [];
          matchedBooks.forEach((book) => {
            addBooks.push(book._id);
          });
          if (addBooks.length !== 0) {
            realUser.find({ _id: req.body.payload.owner }, (error, userToEmail) => {
              const email = userToEmail[0].emailAddress;
              const firstName = userToEmail[0].firstName;
              sendEmail(emails.matchFoundEmail(email, firstName, req.body.payload.name));
            });
          }
          realUser.update({ _id: req.body.payload.owner }, { $addToSet: { matchedBooks: { $each: addBooks } } }, (error) => {
            console.warn(`Error: ${error}`);
          });
        },
      );
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.post('/clickBuy', (req, res) => {
  let buyer;
  let bookFound;
  let seller;

  realUser.find({ _id: req.body.userID }, (err, foundUser) => {
    buyer = foundUser[0];
    Textbook.update({ _id: req.body.bookID }, { $set: { status: 1 } }, (error) => {
      console.log(`Error: ${error}`);
    });
    Textbook.find({ _id: req.body.bookID }, (errors, foundBook) => {
      bookFound = foundBook[0];
      TextbookBuy.update({
        $and: [{ status: 0 }, { $or: [{ name: bookFound.name }, { course: bookFound.course }] },
          { owner: req.body.userID }],
      }, { $set: { status: 1 } }, (error) => {
        console.log(`Error in finding book being bought:  ${error}`);
      });
      realUser.find({ _id: bookFound.owner }, (error, sellerUser) => {
        seller = sellerUser[0];
        sendEmail(emails.emailForUs(buyer, seller, bookFound));
        sendEmail(emails.emailToSeller(seller.emailAddress, seller.firstName, bookFound.name));
        sendEmail(emails.venmoRequestEmail(buyer.emailAddress, buyer.firstName, bookFound.name));
      });
    });
  });
  res.json(true);
});

/**
 * Finds all books in given users matched books array.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of book objects.
 */
router.post('/showMatches', (req, res) => {
  realUser.find({ _id: req.body.id }, (err, userMatch) => {
    let bookObjects = [];
    const bookIDs = userMatch[0].matchedBooks;
    Textbook.find({ $and: [{ _id: { $in: bookIDs } }, { status: 0 }] }, (error, books) => {
      bookObjects = books;
      res.json(bookObjects);
    });
  });
});

/**
 * Finds all books in database with a matching name or course.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/searchBook/:query', (req, res) => {
  const searchKey = req.params.query;
  Textbook.find({
    $and: [
      { status: 0 },
      { $or: [{ name: { $regex: searchKey, $options: 'i' } }, { course: { $regex: searchKey, $options: 'i' } }] },
    ],
  }, (err, books) => {
    const bookMap = [];
    books.forEach((book) => {
      bookMap.push(book);
    });
    res.json(bookMap);
  });
});

/**
 * @deprecated Due to inefficiency
 * Gets all books being sold from database.
 * @param {object} req Request body from client.
 * @param {array} res Body of HTTP response.
 * @returns {object} Array of books from database.
 */
router.get('/displayAllBooks', (req, res) => {
  Textbook.find({ status: 0 }, (err, books) => {
    res.json(books);
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
