import User from '../models/user';

const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
  {
    emailAddress: 'username',
  },

  (emailAddress, password, done) => {
    User.findOne({ emailAddress }, (err, user) => {
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
);

module.exports = strategy;
