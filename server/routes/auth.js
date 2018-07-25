/**
 * @file User routes for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import mongoose from 'mongoose';

import User from '../models/user';
import Textbook from '../models/textbook';
import TempUser from '../models/tempUser';


// TempUser.getIndexes({ 'createdAt': 1 }, { expireAfterSeconds: 86400 })

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

// Start of email verification changes

const bcrypt = require('bcryptjs');

const emails = require('../emails/emailFunctions');

// const crypto = require("crypto");

const nev = require('email-verification')(mongoose);

const rand = require('rand-token');
// Makes the email configuration settings

// Hashing function
function myHasher(password, tempUserData, insertTempUser, callback) {
  const hash = bcrypt.hashSync(password, 10, null);
  return insertTempUser(hash, tempUserData, callback);
}

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
  // This might break the log in for the new users as it might be hashing the hash.
  hashingFunction: myHasher,
  emailFieldName: 'emailAddress',
  passwordFieldName: 'password',

}, function(error, options){
  if (error){
    console.log(error);
    return;
  }
});

// Creating the temp user
nev.generateTempUserModel(User, (err) => {
  if (err) {
    console.log(err);
    return;
  }
});


// Needs functionality for this. Unsure if it will be used.
router.post('/resendEmailVerification', (req, res) => {
  const email = req.emailAddress;
  console.log(email);
});

router.get('/email-verification/:URL', (req, res) => {
  const url = req.params.URL;
  TempUser.findOne({ emailToken: url }, (error, tempUser) => {
    if (error) {
      console.log(error);
    }
    if (tempUser) {
      const newUser = new User({
        emailAddress: tempUser.emailAddress,
        password: tempUser.password,
        CMC: tempUser.CMC,
        venmoUsername: tempUser.venmoUsername,
        firstName: tempUser.firstName,
        lastName: tempUser.lastName,
        matchedBooks: [],
        university: tempUser.university,
        notifications: [{ date: new Date(), message: 'Thank you for signing up!' }],
        resetPasswordToken: '',
        resetPasswordExpires: '',
      });
      newUser.save()
        .then(() => {
          console.log('a new user has been verified');
          sendEmail(emails.signedUpEmail(newUser.emailAddress, newUser.firstName));// Verified the user
          TempUser.remove({ emailToken: url }, (err, reeeee) => {
            if (err) {
              console.log('had an error' + err);
            }
            // console.log(reeeee);
          });// removes temp user
          // TempUser.remove({ emailAddress: newUser.emailAddress});
          res.redirect('/emailConfirmed');
        });
    } else {
      console.log('user data probabbly expired, send some sort of msg');
      res.redirect('/signup');
    }
  });

  // nev.confirmTempUser(url, function(err, user) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   // user was found!
  //   if (user) {
  //     // optional
  //     sendEmail(signedUpEmail(user.emailAddress, user.firstName));// Verified the user
  //     res.redirect('/home');
  //   } else{
  //     console.log('user data probably expired, send some sort of msg');
  //     res.redirect('api/auth/signup');
  //   }
  // });
});

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

router.post('/signup', (req, res) => {
  const {
    emailAddress,
    password,
    CMC,
    venmoUsername,
    firstName,
    lastName,
    university,
  } = req.body.data;

  User.findOne({ emailAddress }, (err, user) => {
    if (err) {
      console.log(`User.js post error: ${err}`);
    } else if (user) {
      res.sendStatus(409);
    } else {
      TempUser.findOne({ emailAddress }, (er, existingUser) => {
        if (err) {
          console.error(`tempUser.js post error: ${er}`);
        } else if (existingUser) {
          res.sendStatus(409);
        } else {
          console.log(`Making a temp user from ${university}`);
          const emailToken = rand.generate(48);
          const newUser = new TempUser({
            emailAddress,
            password,
            CMC,
            venmoUsername,
            firstName,
            lastName,
            matchedBooks: [],
            university,
            emailToken,
            createdAt: Date.now(),
          });
          newUser.save()
            .then(() => {
              console.info('temp user was saved to DB');
              const URL = newUser.emailToken;
              sendEmail(emails.verifyEmail(emailAddress, firstName, URL));
              res.sendStatus(201);
            });
        }
      });
      // // More stuff for the email verification
      // nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
      //   // some sort of error
      //   if (err) {
      //     console.log(`User.js post error: ${err}`);
      //   }
      //   // user already exists in persistent collection...
      //   if (existingPersistentUser){
      //     res.json({
      //       error: `Sorry, already a user with the username: ${emailAddress}`,
      //     });}
      //   // a new user
      //   if (newTempUser) {
      //     var URL = newTempUser[nev.options.URLFieldName];
      //     console.log(emailAddress);
      //     sendEmail(emails.verifyEmail(emailAddress, firstName, URL));
      //   } else {
      //     res.json({
      //       msg: 'You have already signed up. Please check your email to verify your account.'
      //     });
      //     // flash message of failure...
      //     console.log('failure; auth.js');
      //   }
      // });
    }
  });
});

router.post('/login', (req, res) => {
  const { emailAddress, password } = req.body;
  User.findOne({ emailAddress }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: err });
      return;
    }
    if (!user) {
      res.sendStatus(401);
      return;
    }
    if (!user.checkPassword(password)) {
      res.sendStatus(401);
      return;
    }

    const userInfo = {
      // Can add more stuff into this so that it has more info, for now it only has the id
      _id: user._id,
    };

    // Creates the token and sends the JSON back
    jwt.sign({ userInfo }, 'secretKey', { expiresIn: '30 days' }, (error, token) => {
      res.status(200).json({ token });
    });
  });
});


// Will update name, venmo, address
// Requires the token to be sent as we ll as the body to cointain the info that will be updated
router.post('/updateProfile', (req, res) => {
  // Method to verify, this is commented out because everything
  // depends on having some infomration in the session storage
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      User.update(
        { _id: mongoose.Types.ObjectId(authData.userInfo._id) },
        {
          $set:
            {
              firstName: req.body.data.firstName,
              lastName: req.body.data.lastName,
              venmoUsername: req.body.data.venmoUsername,
              CMC: req.body.data.CMC,
            },
        },
        (error) => {
          console.error(`Error: ${error}`);
        },
      );
      res.sendStatus(200);
    }
  });
});


// Will update the password
// Requires the token to be sent as well as the plain
// text password to be sent, will be hashed inside of the function.
router.post('/updatePassword', (req, res) => {
  // Method to verify, this is commented out because everything depends
  // on having some infomration in the session storage
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (error) {
          console.warn(error);
          res.sendStatus(400);
          return;
        }
        if (!user) {
          console.log('error in the finding of the user');
          res.status(401).send({ error: 'You need to create an account.' });
          return;
        }
        if (!user.checkPassword(req.body.data.password)) {
          res.status(401).send({ error: 'Incorrect Password' });
          return;
        }

        // if it passes all the check before there is a user and the
        // password is correct so it can be updated for the new one
        User.update(
          { _id: authData.userInfo._id },
          {
            $set:
              {
                password: user.hashPassword(req.body.data.newPassword),
              },
          },
          (error) => {
            console.log(`Error: ${error}`);
          },
        );
        res.sendStatus(200);
      });
    }
  });
});


router.post('/passwordResetRequest', (req, res) => {
  const email = req.body.data.emailAddress;
  let token;
  User.findOne({ emailAddress: email }, (err, user) => {
    if (user != null) {
      crypto.randomBytes(20, function (error, buf) {
        token = buf.toString('hex');
      });
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 86400000;
      user.save(function (er) {
        if (er) {
          console.log(er);
        }
      });
      sendEmail(emails.passwordResetEmail(user.emailAddress, user.firstName, user.resetPasswordToken));
    } else {
      console.log(`no such user found with email: ${email}`);
      res.status(406).send({ error: 'no user found' });
    }
  });
});

router.get('/passwordReset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
    if (!user) {
      console.log(`invalid token: ${req.params.token}`);
      res.status(406).send({ error: 'token expired or is invalid' });
    } else {
      res.redirect('/resetPassword/:token');
    }
  });
});

router.post('/passwordReset', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      console.log(`invalid token: ${req.params.token}`);
      res.status(406).send({ error: 'token expired or is invalid' });
    } else {
      user.password = User.hashPassword(req.password);
      user.resetPasswordExpires = undefined;
      user.resetPasswordToken = undefined;
      user.save((error) => {
        console.log(error);
      });
      // can send an email here
      res.redirect('/home');
    }
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
