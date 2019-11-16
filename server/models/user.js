/**
 * @file user.js
 * @description User Schema for the MongoDB database.
 * @author Daniel Munoz
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

mongoose.promise = Promise;

const userSchema = new Schema({
  // All required fields when user signs up are first
  emailAddress:   { type: String, unique: true, required: true },
  password:       { type: String, required: true },
  venmoUsername:  { type: String, required: true },
  CMC:            { type: String, required: true },
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  university:     { type: String, required: true },
  permissionType: { type: Number, required: true, default: 0 },

  // These are fields that will be updated later
  numberOfBooksSold:    { type: Number, default: 0 },
  numberOfBooksBought:  { type: Number, default: 0 },
  moneyMade:            { type: Number, default: 0 },
  matchedBooks:         [{ type: String }],
  cart:                 [{ type: String }],
  notifications: [{
    date: String,
    message: String,
  }],
  resetPasswordToken:   { type: String },
  resetPasswordExpires: { type: Date },
}, {
  collection: 'users',
});

// Define schema methods
userSchema.methods = {
  checkPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

export default mongoose.model('User', userSchema);
