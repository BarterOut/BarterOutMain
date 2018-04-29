import User from '../models/newUser';

const express = require('express');

const router = express.Router();

router.post('/signup', (req, res) => {
  console.log('Signing Up');

  User.findOne({ emailAddress: req.body.emailAddress }, (err, user) => {
    if (err) {
      console.warn('User.js post error: ', err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${req.body.emailAddress}`,
      });
    } else {
      console.log('ELSE');
      const newUser = new User();
      newUser.emailAddress = req.body.emailAddress;
      newUser.venmoUsername = req.body.venmoUsername;
      newUser.CMC = req.body.CMC;
      newUser.password = newUser.hashPassword(req.body.password);
      console.log(req.body.password);
      console.log(typeof newUser.password);
      newUser.save()
        .then(() => {
          res.redirect('/login');
        })
        .catch((error) => {
          console.log(`Error ${error}`);
          res.status(400).send(`Unable to save to database ${error}`);
        });
    }
  });
});

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
    res.json(user);
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
