/**
 * @file transaction.js
 * @description Transaction schema for the DB (NOT IN USE).
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @version 0.0.4
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const TransactionSchema = new Schema({
  date:           { type: Date, required: true, default: Date.now() },
  buyerID:        { type: String, required: true },
  buyerFirstName: { type: String, required: true, default: '' },
  buyerLastName:  { type: String, required: true, default: '' },
  buyerVenmo:     { type: String, required: true, default: '' },
  buyerEmail:     { type: String, required: true, default: '' },
  totalCharged:   { type: Number, required: true },
  booksPurchased: [{ type: String }],
  status:         { type: Number, required: true, default: 0 },
}, {
  collection: 'transactions',
});

export default mongoose.model('Transaction', TransactionSchema);
