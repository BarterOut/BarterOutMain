import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transaction = new Schema({
  date: { type: Date, required: true, default: Date.now() },
  buyerID: { type: String, required: true },
  buyerFirstName: { type: String, required: true, default: '' },
  buyerLastName: { type: String, required: true, default: '' },
  buyerVenmo: { type: String, required: true, default: '' },
  sellerID: { type: String, required: true },
  sellerFirstName: { type: String, required: true, default: '' },
  sellerLastName: { type: String, required: true, default: '' },
  sellerVenmo: { type: String, required: true, default: '' },
  totalCharged: { type: Number, required: true },
  booksPurchased: [{ type: String }],
  status: { type: Number, required: true, default: 0 },
  collection: 'transactions',
});

export default mongoose.model('Transaction', transaction);
