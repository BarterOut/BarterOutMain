import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import User from '../models/user';

const express = require('express');

const router = express.Router();

router.get('/getPurchasedBooks/:token', (req, res) => {
  Textbook.find({ status: 2 }, (err, books) => {
    res.status(200).json(books);
  });
});

router.get('/getTransactions/:token', (req, res) => {
  Textbook.find({ status: 1 }, (err, books) => {
    res.status(200).json(books);
  });
});

router.get('/getUsers/:token', (req, res) => {
  User.find({}, (err, users) => {
    res.status(200).json(users);
  });
});

router.post('/confirmBook', (req, res) => {
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
});

router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});


module.exports = router;