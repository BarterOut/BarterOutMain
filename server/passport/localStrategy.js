const NewUser = require('../models/newUser')
const LocalStrategy = require('passport-local').Strategy
import User from '../models/user';

const strategy = new LocalStrategy(
  {
    emailAddress: 'username' // not necessary, DEFAULT
  },
  function(emailAddress, password, done) {
    console.log("gonna double check")
    User.findOne({ emailAddress: emailAddress }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  },
)

module.exports = strategy;