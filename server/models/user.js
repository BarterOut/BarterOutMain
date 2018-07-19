/**
 * @file User Schema for the MongoDB database.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;


const userSchema = new Schema({
  // All required fields when user signs up are first
  emailAddress: { type: 'String', unique: true, required: true },
  password: { type: 'String', required: true },
  venmoUsername: { type: 'String', required: true },
  CMC: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  university: { type: 'String', required: true },
  // These are fields that will be updated later
  numberOfBooksSold: { type: 'Number' },
  numberOfBooksBought: { type: 'Number' },
  moneyMade: { type: 'Number' },
  matchedBooks: [{ type: String }],
  cart: [{ type: String }],
  resetPasswordToken: { type: 'String' },
  resetPasswordExpires: { type: Date },
}, {
  collection: 'users',
});

// Define schema methods
// Yes the linting is mad but if we fix the linting the code breals :(
userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: function(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving disabled in order to avoid double hashing of passwords
// newUserSchema.pre('save', function (next) {
//   if (!this.password) {
//     console.log('models/user.js =======NO PASSWORD PROVIDED=======');
//
//
//     next();
//   } else {
//     console.log('models/user.js hashPassword in pre save');
//
//     this.password = this.hashPassword(this.password)
//     console.log(this.password)
//     next();
//   }
// })
export default mongoose.model('User', userSchema);
