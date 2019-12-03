/**
 * @file Authentication routes for Express.js server.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import mongoose from 'mongoose';

// Models
import User from '../models/user';
import TempUser from '../models/tempUser';

import response from '../resources/response';
import config from '../config';
import auth from '../auth';

const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nev = require('email-verification')(mongoose);
const rand = require('rand-token');

const jwt = require('jsonwebtoken');
const emails = require('../resources/emails');

const notification = require('../resources/Notifications');

/**
 * Hashes a user's password.
 * @param {String} password Password to Hash
 * @param {Object} tempUserData User data from temp user.
 * @param {Function} insertTempUser Function to insert temp user intoDB.
 * @param {Function} callback Callback function.
 */
function hasher(password, tempUserData, insertTempUser, callback) {
  const hash = bcrypt.hashSync(password, 10, null);
  return insertTempUser(hash, tempUserData, callback);
}

let verificationURL;
const endpoint = '/api/auth/email-verification/${URL}'; // eslint-disable-line
if (process.env.NODE_ENV === 'production') {
  verificationURL = `https://www.barterout.com${endpoint}`;
} else if (process.env.NODE_ENV === 'staging') {
  verificationURL = `https://barterout-dev.herokuapp.com${endpoint}`;
} else {
  verificationURL = `localhost:8080${endpoint}`;
}

// Configurations for the temp users.
const htmlMessage = '<p>Please verify your account by clicking <a href="${URL}">this link</a>.'; // eslint-disable-line
nev.configure({
  verificationURL,
  persistentUserModel: User,
  tempUserCollection: 'barterOut_tempusers',
  shouldSendConfirmation: false,

  transportOptions: {
    host:           'smtp.gmail.com',
    auth: {
      type:         'OAuth2',
      clientId:     process.env.CLIENT_ID,
      clientSecret: process.env.NEV_CLIENT_SECRET,
    },
  },
  verifyMailOptions: {
    from:           '"Barter Out" <development@barterout.com',
    subject:        'Please confirm account',
    html:           htmlMessage,
    auth: {
      user:         'development@barterout.com',
      clientId:     process.env.CLIENT_ID,
      clientSecret: process.env.NEV_CLIENT_SECRET,
    },
  },
  hashingFunction:   hasher,
  emailFieldName:    'emailAddress',
  passwordFieldName: 'password',
}, (error) => {
  if (error) {
    throw new Error(`Error: ${error}`);
  }
});

/**
 * @description Called when a user clicks the confirm
 * link in thier email.
 * @access Public
 */
function emailVerification(req, res) {
  const url = req.params.URL;
  TempUser.findOne({ emailToken: url }, (error, tempUser) => {
    if (error) {
      res.status(400).json(error);
    }
    if (tempUser) {
      const newUser = new User({
        emailAddress:         tempUser.emailAddress,
        password:             tempUser.password,
        CMC:                  tempUser.CMC,
        venmoUsername:        tempUser.venmoUsername,
        firstName:            tempUser.firstName,
        lastName:             tempUser.lastName,
        matchedBooks:         [],
        university:           tempUser.university,
        notifications:        [notification.thanksForSigningUp()],
        resetPasswordToken:   '',
        resetPasswordExpires: '',
      });
      newUser.save()
        .then(() => {
          // Verified the user
          emails.sendEmail(emails.signedUpEmail(newUser.emailAddress, newUser.firstName));
          TempUser.remove({ emailToken: url }, (error) => {
            if (error) {
              res.status(400).json(response({ error }));
            }
          });
          res.redirect('/email-confirmed');
        });
    } else {
      res.redirect('/signup');
    }
  });
}

/**
 * @description Creates an temporary (unconfirmed) account for a user.
 * @access Public
 */
function signup(req, res) {
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
      res.status(400).json(response({ error }));
    } else if (user) {
      res.status(409).json(response({ error: 'Existing User' }));
    } else {
      TempUser.findOne({ emailAddress }, (error, existingUser) => {
        if (error) {
          res.status(400).json(response({ error }));
        } else if (existingUser) {
          res.status(409).json(response({ error: 'Existing Temp User' }));
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
              emails.sendEmail(emails.verifyEmail(emailAddress, firstName, URL));
              res.status(201).json(response());
            });
        }
      });
    }
  });
}

/**
 * @description Logs in a user provided a valid email and password.
 * @access Public
 */
function login(req, res) {
  const { body: { data: { emailAddress, password } } } = req;
  User.findOne({ emailAddress }, (error, user) => {
    if (error) {
      res.status(400).json(response({ error }));
    }
    if (!user) {
      res.status(401).json(response({ error: 'No Account' }));
    }
    if (!user.checkPassword(password)) {
      res.status(401).json(response({ error: 'Incorrect Password' }));
    }

    const userInfo = {
      // Can add more stuff into this so that it has more info, for now it only has the id
      // and the permission type for handling admin dashboard auth on frontend.
      _id: user._id,
      permissionType: user.permissionType,
    };

    // Creates the token and sends the JSON back
    jwt.sign({ userInfo }, config.key, { expiresIn: '30 days' }, (error, token) => {
      res.status(200).json(response({ token }));
    });
  });
}


/**
 * @description Will update name, venmo, address
 * Requires the token to be sent.
 * @access Restricted
 */
function updateProfile(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  const { body: { data } } = req;
  User.update(
    { _id },
    {
      $set:
        {
          firstName:     data.firstName,
          lastName:      data.lastName,
          venmoUsername: data.venmoUsername,
          CMC:           data.CMC,
        },
    },
    (error) => {
      if (error) {
        res.status(400).json(response({ error }));
      } else {
        res.status(200).json(response());
      }
    },
  );
}

/**
 * @description Will update the password
 * Requires the token to be sent as well as the plain
 * text password to be sent, will be hashed inside of the function.
 * @access Restricted
 */
function updatePassword(req, res) {
  const { payload: { userInfo: { _id } } } = req;
  User.findOne({ _id }, (error, user) => {
    if (error) {
      res.status(400).json(response({ error }));
      return;
    }
    if (!user) {
      res.status(401).json(response({ error: 'You need to create an account.' }));
      return;
    }
    if (!user.checkPassword(req.body.data.password)) {
      res.status(401).json(response({ error: 'Incorrect Password' }));
      return;
    }

    // if it passes all the check before there is a user and the
    // password is correct so it can be updated for the new one
    User.update(
      { _id },
      {
        $set:
          {
            password: user.hashPassword(req.body.data.newPassword),
          },
      },
      (error) => {
        if (error) {
          res.status(400).json(response({ error }));
        } else {
          res.status(200).json(response());
        }
      },
    );
  });
}

/**
 * @description Sends email to user with token to reset password,
 * this token is verified by the another API call.
 * @access Public
 */
function passwordResetRequest(req, res) {
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
                resetPasswordToken:   token,
                resetPasswordExpires: endDate,
              },
          },
          (error) => {
            if (error) {
              res.status(400).json(response({ error }));
            }
          },
        );
        emails.sendEmail(emails.passwordResetEmail(user.emailAddress, user.firstName, token));
        res.status(200).json(response());
      });
    } else {
      res.status(406).json(response({ error: 'No user found.' }));
    }
  });
}

/**
 * @description Route from redirect of password reset request.
 * This is the link they click in the email.
 * @access Public
 */
function passwordResetToken(req, res) {
  User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
    if (!user) {
      res.status(406).json(response({ error: 'Token expired or is invalid' }));
    } else {
      res.redirect(`/resetPassword/${req.params.token}`);
    }
  });
}

/**
 * @description Request sent from link page use is taken to
 * after forgetting their password.
 * @access Public
 */
function passwordReset(req, res) {
  User.findOne(
    {
      resetPasswordToken: req.body.data.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    (err, user) => {
      if (!user) {
        res.status(406).json(response({ error: 'token expired or is invalid' }));
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
            if (error) {
              res.status(400).json(response({ error }));
            }
          },
        );
        res.status(200).json(response());
      }
    },
  );
}

function authBase(req, res) {
  res.status(200).json(response());
}

router.get('/', authBase);
router.get('/passwordReset/:token', passwordResetToken);
router.get('/email-verification/:URL', emailVerification);

router.post('/updatePassword', auth.required, updatePassword);
router.post('/updateProfile', auth.required, updateProfile);
router.post('/passwordReset', passwordReset);
router.post('/passwordResetRequest', passwordResetRequest);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
