import User from '../models/newUser';

const express = require('express');

const router = express.Router();

// THIS FUNCTION WORKS
router.post('/signup', (req, res) => {
  const { emailAddress, password, CMC, venmoUsername, firstName, lastName  } = req.body;

  // TODO: ADD VALIDATION
  User.findOne({ emailAddress: emailAddress }, (err, user) => {
      if (err) {
          console.log('User.js post error: ', err)
      } else if (user) {
          res.json({
              error: `Sorry, already a user with the username: ${emailAddress}`
          })
      }
      else {
          const newUser = new User({
              emailAddress: emailAddress,
              password: password,
              CMC: CMC,
              venmoUsername: venmoUsername,
              firstName: firstName,
              lastName: lastName,
              matchedBooks: []

          })
          newUser.save((err, savedUser) => {
              if (err) return res.json(err)
              // res.json(savedUser)
          })
      }
  })
})

router.post('/login', (req, res) => {
  const { emailAddress, password } = req.body;
  User.findOne({ emailAddress: emailAddress }, (err, user) => {
    if (err) {
      console.warn(err);
      res.json({ error: err });
      return;
    }
    if (!user) {
      res.status(401).send({ error: 'You need to create an account' });
      return;
    }
    if (!user.checkPassword(password)) {
      res.status(401).send({ error: 'Incorrect Password' });
      return;
    }
    var returnUser = {
        emailAddress: user.emailAddress,
        venmoUsername: user.venmoUsername,
        CMC: user.CMC,
        firstName: user.firstName,
        lastName: user.lastName,
        matchedBooks: user.matchedBooks
    }
    res.json(returnUser);
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
