import mongoose from 'mongoose';

import User from '../models/newUser';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

// Start of email verification changes

const bcrypt = require('bcryptjs');


const nev = require('email-verification')(mongoose);
// Makes the email configuration settings

// Hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  var hash = bcrypt.hashSync(password, 10, null);
  return insertTempUser(hash, tempUserData, callback);
};
// Configurations for the temp user stuff
nev.configure({
  verificationURL: 'https://www.barterout.com/api/auth/email-verification/${URL}',
  persistentUserModel: User,
  tempUserCollection: 'barterOut_tempusers',
  shouldSendConfirmation: false,

  transportOptions: {
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
      clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
    },
  },
  verifyMailOptions: { // This won't actually be used but it is necessary for the package to work. the
    from: '"Barter Out" <office@barterout.com',
    subject: 'Please confirm account',
    html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
    'paste the following link into your browser:</p><p>${URL}</p>',
    auth: {
      user: 'office@barterout.com',
      refreshToken: '1/9XdHU4k2vwYioRyAP8kaGYfZXKfp_JxqUwUMYVJWlZs',
      accessToken: 'ya29.GluwBeUQiUspdFo1yPRfzFMWADsKsyQhB-jgX3ivPBi5zcIldvyPYZtRME6xqZf7UNzkXzZLu1fh0NpeO11h6mwS2qdsL_JREzpKw_3ebOWLNgxTyFg5NmSdStnR',
    },
  },
  hashingFunction: myHasher, // This might break the log in for the new users as it might be hashing the hash.
  emailFieldName: 'emailAddress',
  passwordFieldName: 'password',

}, function(error, options){
  if (error){
    console.log(error);
    return;
  }
});
// Creating the temp user
nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

});


// Needs functionality for this. Unsure if it will be used.
router.post('/resendEmailVerification', ( req, res ) => {
  var email = req.emailAddress;
  console.log(email);
});

router.get('/email-verification/:URL', (req, res) => {
  var url = req.params.URL;
  nev.confirmTempUser(url, function(err, user) {
    if (err) {
      console.log(err);
    }
    // user was found!
    if (user) {
      // optional
      sendEmail(signedUpEmail(user.emailAddress, user.firstName));// Verified the user
      res.redirect('/home');
    } else{
      console.log('user data probably expired, send some sort of msg');
      res.redirect('api/auth/signup');
    }
  });

});

function verifyEmail(emailTo, firstName, URL) {
  return {
    from: '"Barter Out" <office@barterout.com',
    to: emailTo,
    subject: 'Thank you for signing up',
    html: 'Dear ' + firstName + ',  <br></br> ' +
    '\n' +
    'Thank you for signing up on our platform. Start using our service today on our <a href="https://www.barterout.com/" target="_blank">website</a> by putting a textbook up for sale or buying one from another student.    <br></br> ' +
    'Please verify your account by clicking <a href=http://localhost:8080/api/auth/email-verification/' +URL+ '>this link</a>. If you are unable to do so, copy and paste the following link into your browser:' + URL + '<br> </br>' +
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

// End of email verification changes
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
  User.findOne({ emailAddress }, (err, user) => {
    if (err) {
      console.log(`User.js post error: ${err}`);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${emailAddress}`,
      });
    } else {
      console.log(`Making a new user from ${univeristy}`);
      const newUser = new User({
        emailAddress,
        password,
        CMC,
        venmoUsername,
        firstName,
        lastName,
        matchedBooks: [],
        univeristy,
      });

      // More stuff for the email verification
      nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
        // some sort of error
        if (err) {
          console.log(`User.js post error: ${err}`);
        }
        // user already exists in persistent collection...
        if (existingPersistentUser){
          res.json({
            error: `Sorry, already a user with the username: ${emailAddress}`,
          });}
        // a new user
        if (newTempUser) {
          var URL = newTempUser[nev.options.URLFieldName];
          console.log(emailAddress);
          sendEmail(verifyEmail(emailAddress, firstName, URL));
        } else {
          res.json({
            msg: 'You have already signed up. Please check your email to verify your account.'
          });
          // flash message of failure...
          console.log('failure; user.js');
        }
      });
    }
  });
});

router.get('/userData/:token', (req, res) => {
  const token = req.params.token;
  jwt.verify(token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (!user) {
          res.status(401).send({error: 'You need to create an account' });
        } else {
          const returnUser = {
            _id: user._id,
            emailAddress: user.emailAddress,
            venmoUsername: user.venmoUsername,
            CMC: user.CMC,
            firstName: user.firstName,
            lastName: user.lastName,
            matchedBooks: user.matchedBooks,
          };
          console.log(returnUser);
          res.json({
            message: 'verified',
            returnUser,
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { emailAddress, password } = req.body;
  User.findOne({ emailAddress }, (err, user) => {
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

    const userInfo = {
      // Can add more stuff into this so that it has more info, for now it only has the id
      _id: user._id,
    };

    // Creates the token and sends the JSON back
    jwt.sign({ userInfo }, 'secretKey', { expiresIn: '30 days' }, (error, token) => {
      res.json({
        token,
      });
    });
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
