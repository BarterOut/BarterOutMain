import User from '../models/newUser';

const express = require('express');

const router = express.Router();

const nodemailer = require('nodemailer');

// Start of email verification changes

const bcrypt = require('bcryptjs');


import mongoose from 'mongoose';

const nev = require('email-verification')(mongoose);
// Makes the email configuration settings
nev.configure({
  verificationURL: 'https://www.barterout.com/api/auth/email-verification/${URL}',
  persistentUserModel: User,
  tempUserCollection: 'barterOut_tempusers',

  transportOptions: {
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      clientId: '878736426892-d0vbth6ho78opo916rr1bimlmuufq25e.apps.googleusercontent.com',
      clientSecret: '5OTf_iLhmt0tjJCKIdnuC5XM',
    },
  },
  verifyMailOptions: {
    from: '"Barter Out" <office@barterout.com',
    subject: 'Please confirm account',
    html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
    text: 'Please confirm your account by clicking the following link: ${URL}',
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
});
// Creating the temp user
nev.generateTempUserModel(User);

// Hashing function
// async version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  var hash = bcrypt.hashSync(password, 10, null);
  return insertTempUser(hash, tempUserData, callback);
};

router.get('/email-verification/:URL', (req, res) => {

  var url = req.params.URL;
  console.log(url);//gonna haave to do some parsing here, or maybe not
  nev.confirmTempUser(url, function(err, user) {
    if (err)
    // handle error...
      console.log(err)
    // user was found!
      if (user) {
        // optional
        nev.sendConfirmationEmail(user['emailAddress'], function(error, info) {
          res.redirect('/api/auth/login');
          // redirect to their profile...
        });
      }
      // user's data probably expired...
      else{
        console.log('user data probably expired, send some sort of msg');
        res.redirect('api/auth/signup');
      }
      // redirect to sign-up
        });

});

router.post('/resendEmailVerification', ( req, res ) => {
  var email = req.emailAddress;
  nev.resendVerificationEmail(email, function(err, userFound) {
    if (err) {
      // handle error...
      console.log(err);
    }
      if (userFound){
        // email has been sent
        console.log('email was sent to' + email)
      }
      else{
        // flash message of failure...
        console.log('NO such user was found to resend the email verification to');
      }
  });
})

// End of email verification changes

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
            });
          }

          // a new user
            if (newTempUser) {
              var URL = newTempUser[nev.options.URLFieldName];
              nev.sendVerificationEmail(emailAddress, URL, function(err, info) {
                if (err) {
                  return res.json(err);//email error
                  // handle error...
                }
                console.log('email sent');
                // flash message of success
                  });
              // user already exists in temporary collection...
              console.log('user in temp collection');
              res.json({
                error: `Sorry, already a user with the username: ${emailAddress}`,
              });

            } else {
              // flash message of failure...
              console.log('failure; user.js');

            }
      });
      // End of new stuff for email verification
      // Start of old stuff from creating the user,
      // newUser.save((errs, savedUser) => {
      //   if (err) {
      //     return res.json(err);
      //   } else {
      //     sendEmail(signedUpEmail(savedUser.emailAddress, savedUser.firstName));
      //     res.json("Sign up done!")
      //   }
      //   return 0;
      // });
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
    res.json(returnUser);
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
