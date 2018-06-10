import User from '../models/newUser';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');

function sendEmail(mailOptions) {
  console.info('Send the email!');
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
    clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
  },
});


function signedUpEmail(emailTo, firstName) {
  return {
    from: '"Barter Out" <office@barterout.com',
    to: emailTo,
    subject: 'Thank you for signing up',
    html: 'Dear ' +firstName+',  <br></br> ' +
        '\n' +
        'Thank you for signing up on our platform. Start using our service today on our <a href="https://www.barterout.com/" target="_blank">website</a> by putting a textbook up for sale or buying one from another student.    <br></br> ' +
        '\n' +
        'If you know anyone looking to buy or sell used textbooks, feel free to invite them to join our platform in this beta version.    <br> </br> \n' +
        '<br></br> ' +
        'If you have any questions, feel free to send us an email at office@barterout.com!\n' +
        '<br></br> <br></br>   ' +
        'Thank you,<br></br> ' +
        'The BarterOut team<br></br> <br></br> '+
        '\n' +
        'Like us on <a href="https://www.facebook.com/BarterOut/" target="_blank">Facebook</a> <br> </br> Follow us on <a href="https://www.instagram.com/barteroutofficial/" target="_blank">Instagram</a>',

    auth: {
      user: 'office@barterout.com',
      refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
      accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
      // expires: 1484314697598
    },
  };
}

// THIS FUNCTION WORKS
router.post('/signup', (req, res) => {
  const {
    emailAddress,
    password,
    CMC,
    venmoUsername,
    firstName,
    lastName,
    univeristy,
  } = req.body;

  // TODO: ADD VALIDATION
  User.findOne({ emailAddress: emailAddress }, (err, user) => {
    if (err) {
      console.log(`User.js post error: ${err}`);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${emailAddress}`,
      });
    } else {
      console.log(`Making a new user from ${univeristy}`);
      const newUser = new User({
        emailAddress: emailAddress,
        password: password,
        CMC: CMC,
        venmoUsername: venmoUsername,
        firstName: firstName,
        lastName: lastName,
        matchedBooks: [],
        univeristy: univeristy,
      });
      newUser.save((errs, savedUser) => {
        if (err) {
          return res.json(err);
        } else {
          sendEmail(signedUpEmail(savedUser.emailAddress, savedUser.firstName));
          res.json("Sign up done!")
        }
        return 0;
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
    const returnUser = {
      _id: user._id,
      emailAddress: user.emailAddress,
      venmoUsername: user.venmoUsername,
      CMC: user.CMC,
      firstName: user.firstName,
      lastName: user.lastName,
      matchedBooks: user.matchedBooks,
    };
    const userToken = {
      // Can add more stuff into this so that it has more info, for now it only has the id
      _id: user._id,
    }
    // Creates the token
    jwt.sign({ userToken}, 'secretKey', { expiresIn: "30 days"}, (error, token) => {
      res.json({
        returnUser,
        token,
      });
    });
    // res.json(returnUser);
  });
});

// Just in case this is needed
router.get('/', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;
