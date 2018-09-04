/**
 * @file Authentication routes for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import mongoose from 'mongoose';

import User from '../models/user';
import TempUser from '../models/tempUser';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const emails = require('../emails/emailFunctions');
const crypto = require('crypto');
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
  verifyMailOptions: {
    // This won't actually be used but it is necessary for the package to work. the
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

}, (error) => {
  if (error) {
    console.error(error);
  }
});

// Creating the temp user
nev.generateTempUserModel(User, (err) => {
  if (err) {
    console.error(err);
  }
});

/**
 * Called when a user clicks the confirm link in thier email.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {NULL} Redirects to new page.
 */
router.get('/email-verification/:URL', (req, res) => {
  const url = req.params.URL;
  TempUser.findOne({ emailToken: url }, (error, tempUser) => {
    if (error) {
      res.status(400).json(error);
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
        notifications: [{ date: new Date().toLocaleString(), message: 'Thank you for signing up!' }],
        resetPasswordToken: '',
        resetPasswordExpires: '',
      });
      newUser.save()
        .then(() => {
          // Verified the user
          sendEmail(emails.signedUpEmail(newUser.emailAddress, newUser.firstName));
          TempUser.remove({ emailToken: url }, (err) => {
            if (err) {
              res.status(400).json(err);
            }
          });
          res.redirect('/emailConfirmed');
        });
    } else {
      res.redirect('/signup');
    }
  });
});

// End of email verification changes
const jwt = require('jsonwebtoken');

function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error(err);
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

/**
 * Creates an temporary (unconfirmed) account for a user.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
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

  User.findOne({ emailAddress }, (error, user) => {
    if (error) {
      res.status(400).json(error);
    } else if (user) {
      res.sendStatus(409);
    } else {
      TempUser.findOne({ emailAddress }, (error, existingUser) => {
        if (error) {
          res.status(400).json(error);
        } else if (existingUser) {
          res.sendStatus(409);
        } else {
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
              const URL = newUser.emailToken;
              sendEmail(emails.verifyEmail(emailAddress, firstName, URL));
              res.sendStatus(201);
            });
        }
      });
    }
  });
});

/**
 * Logs in a user provided a valid email and password.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Status code and JWT.
 */
router.post('/login', (req, res) => {
  const { emailAddress, password } = req.body;
  User.findOne({ emailAddress }, (err, user) => {
    if (err) {
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
      permissionType: user.permissionType,
    };

    // Creates the token and sends the JSON back
    jwt.sign({ userInfo }, 'secretKey', { expiresIn: '30 days' }, (error, token) => {
      res.status(200).json({ token });
    });
  });
});


/**
 * Will update name, venmo, address
 * Requires the token to be sent as we ll as the body to cointain the info that will be updated
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/updateProfile', (req, res) => {
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
          res.status(400).json(error);
        },
      );
      res.sendStatus(200);
    }
  });
});

/**
 * Will update the password
 * Requires the token to be sent as well as the plain
 * text password to be sent, will be hashed inside of the function.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Number} Status code.
 */
router.post('/updatePassword', (req, res) => {
  jwt.verify(req.body.data.token, 'secretKey', (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
        if (error) {
          res.sendStatus(400);
          return;
        }
        if (!user) {
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
            res.send(400).json(error);
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
  const endDate = Date.now() + 86400000;
  User.findOne({ emailAddress: { $regex: email, $options: 'i' } }, (err, user) => {
    if (user != null) {
      crypto.randomBytes(32, (err, buffer) => {
        token = buffer.toString('hex');
        User.update(
          { _id: user._id },
          {
            $set:
              {
                resetPasswordToken: token,
                resetPasswordExpires: endDate,
              },
          },
          (error) => {
            res.send(400).json(error);
          },
        );
        sendEmail(emails.passwordResetEmail(user.emailAddress, user.firstName, token));
        res.sendStatus(200);
      });
    } else {
      res.status(406).send({ error: 'no user found' });
    }
  });
});

router.get('/passwordReset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
    if (!user) {
      res.status(406).send({ error: 'Token expired or is invalid' });
    } else {
      res.redirect(`/resetPassword/${req.params.token}`);
    }
  });
});

router.post('/passwordReset/', (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.body.data.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (!user) {
        res.status(406).send({ error: 'token expired or is invalid' });
      } else {
        User.update(
          { _id: user._id },
          {
            $set:
              {
                resetPasswordToken: undefined,
                resetPasswordExpires: undefined,
                password: user.hashPassword(req.body.data.password),
              },
          },
          (error) => {
            res.send(400).json(error);
          },
        );
        // can send an email here
        res.redirect('/home');
      }
    },
  );
});

router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
