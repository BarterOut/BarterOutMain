/**
 * @file textbook.js
 * @description Base Textbook schema for the DB.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const textbook = new Schema({
  name:      { type: String, required: true },
  edition:   { type: Number, required: true },
  course:    { type: String, required: true },
  price:     { type: Number, required: true },
  status:    { type: Number, required: true },
  ISBN:      { type: Number, required: false },
  condition: { type: String, required: true },
  owner:     { type: String, required: true },
  comments:  { type: String, required: false },
  date:      { type: Number, required: true },
  buyer:     { type: String, required: false, default: '' },
});

textbook.index({
  name:    'text',
  course:  'text',
  status:  'text',
  edition: 'text',
  owner:   'text',
});

export default mongoose.model('Textbook', textbook);
