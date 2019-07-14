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

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nev = require('email-verification')(mongoose);
const rand = require('rand-token');

const jwt = require('jsonwebtoken');
const emails = require('../emails/emailFunctions');

const notification = require('../resources/Notifications');

/**
 * Hashes a user's password.
 * @param {String} password Password to Hash
 * @param {Object} tempUserData User data from temp user.
 * @param {Function} insertTempUser Function to insert temp user intoDB.
 * @param {Function} callback Callback function.
 */
function myHasher(password, tempUserData, insertTempUser, callback) {
  const hash = bcrypt.hashSync(password, 10, null);
  return insertTempUser(hash, tempUserData, callback);
}

let verificationURL;
if (process.env.NODE_ENV == 'production') {
  verificationURL = 'https://www.barterout.com/api/auth/email-verification/${URL}'; // eslint-disable-line
} else if (process.env.NODE_ENV == 'staging') {
  verificationURL = 'https://barterout-dev.herokuapp.com/api/auth/email-verification/${URL}'; // eslint-disable-line
} else {
  verificationURL = 'localhost:8080/api/auth/email-verification/${URL}'; // eslint-disable-line
}

// Configurations for the temp users.
nev.configure({
  verificationURL,
  persistentUserModel: User,
  tempUserCollection: 'barterOut_tempusers',
  shouldSendConfirmation: false,

  transportOptions: {
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.NEV_CLIENT_SECRET,
    },
  },
  verifyMailOptions: {
    // This won't actually be used but it is necessary for the package to work. the
    from: '"Barter Out" <development@barterout.com',
    subject: 'Please confirm account',
    html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>.', // eslint-disable-line
    auth: {
      user: 'development@barterout.com',
      refreshToken: process.env.EVR_TOKEN,
      accessToken: process.env.EV_TOKEN,
    },
  },
  // This might break the log in for the new users as it might be hashing the hash.
  hashingFunction: myHasher,
  emailFieldName: 'emailAddress',
  passwordFieldName: 'password',
}, (error) => {
  if (error) {
    throw new Error(`Error: ${error}`);
  }
});

// Creating the temp user
nev.generateTempUserModel(User, (error) => {
  if (error) {
    throw new Error(`Error: ${error}`);
  }
});

// TODO: Remove redirects
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
        notifications: [notification.thanksForSigningUp()],
        resetPasswordToken: '',
        resetPasswordExpires: '',
      });
      newUser.save()
        .then(() => {
          // Verified the user
          sendEmail(emails.signedUpEmail(newUser.emailAddress, newUser.firstName));
          TempUser.remove({ emailToken: url }, (error) => {
            if (error) {
              res.status(400).json(response({ error }));
            }
          });
          res.redirect('/emailConfirmed');
        });
    } else {
      res.redirect('/signup');
    }
  });
});

function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw new Error(`Error: ${error}`);
    }
  });
}

const transporter = nodemailer.createTransport({ // secure authentication
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.NEV_CLIENT_SECRET,
  },
});

/**
 * Creates an temporary (unconfirmed) account for a user.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard API Repsonse.
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
              sendEmail(emails.verifyEmail(emailAddress, firstName, URL));
              res.status(201).json(response(null));
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
  User.findOne({ emailAddress }, (error, user) => {
    if (error) {
      res.status(400).json(response({ error }));
      return;
    }
    if (!user) {
      res.status(401).json(response({ error: 'No Account' }));
      return;
    }
    if (!user.checkPassword(password)) {
      res.status(401).json(response({ error: 'Incorrect Password' }));
      return;
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
});


/**
 * Will update name, venmo, address
 * Requires the token to be sent as we ll as the body to cointain the info that will be updated
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard API response.
 */
router.post('/updateProfile', (req, res) => {
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
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
          if (error) {
            res.status(400).json(response({ error }));
          } else {
            res.status(200).json(response(null));
          }
        },
      );
    }
  });
});

/**
 * Will update the password
 * Requires the token to be sent as well as the plain
 * text password to be sent, will be hashed inside of the function.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard API Response.
 */
router.post('/updatePassword', (req, res) => {
  jwt.verify(req.body.data.token, config.key, (error, authData) => {
    if (error) {
      res.status(403).json(response({ error }));
    } else {
      User.findOne({ _id: authData.userInfo._id }, (error, user) => {
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
          { _id: authData.userInfo._id },
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
              res.status(200).json(response(null));
            }
          },
        );
      });
    }
  });
});


/**
 * Sends email to user with token to reset password,
 * this token is verified by the another API call.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard API Response.
 */
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
            if (error) {
              res.status(400).json(response({ error }));
            }
          },
        );
        sendEmail(emails.passwordResetEmail(user.emailAddress, user.firstName, token));
        res.status(200).json(response(null));
      });
    } else {
      res.status(406).json(response({ error: 'No user found.' }));
    }
  });
});

// TODO: remove redirect
/**
 * Route from redirect of password reset request.
 * This is the link they click in the email.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard API Response.
 */
router.get('/passwordReset/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token }, (err, user) => {
    if (!user) {
      res.status(406).json(response({ error: 'Token expired or is invalid' }));
    } else {
      res.redirect(`/resetPassword/${req.params.token}`);
    }
  });
});

/**
 * Request sent from link page use is taken to
 * after forgetting their password.
 * @param {Object} req Request body from client.
 * @param {Object} res Body of HTTP response.
 * @returns {Object} Standard API Response.
 */
router.post('/passwordReset/', (req, res) => {
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
        res.status(200).json(response(null));
      }
    },
  );
});

router.get('/', (req, res) => {
  res.status(200).json(response(null));
});

module.exports = router;
