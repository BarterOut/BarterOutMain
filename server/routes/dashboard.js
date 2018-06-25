import Textbook from '../models/textbook';
import TextbookBuy from '../models/textbookBuy';
import realUser from '../models/newUser';

const express = require('express');

const router = express.Router();

router.get('/displayTransactions', (req, res) => {
  TextbookBuy.find({ status: 0 }, (err, books) => {
    res.json(books);
  });
});

router.get('/home', (req, res) => {
  //TODO:
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
})

router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});


module.exports = router;