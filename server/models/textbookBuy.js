/**
 * @file textbookBuy.js
 * @description (Requested) Textbook schema for the DB.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const TextbookBuy = new Schema({
  name: { type: 'String', required: true },
  course: { type: 'String', required: true },
  status: { type: 'Number', required: true },
  owner: { type: 'String', required: true },
  date: { type: 'Number', required: true },
}, {
  collection: 'booksWanted',
});

// TextbookBuy.index({ '$**': 'text' });
// can add weights here later!
TextbookBuy.index({
  name: 'text',
  course: 'text',
  status: 'text',
  owner: 'text',
});

export default mongoose.model('TextbookBuy', TextbookBuy);
