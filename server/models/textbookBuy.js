import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
TextbookBuy.index({
  name: 'text',
  course: 'text',
  status: 'text',
  owner: 'text',
}); // can add weights here later!


export default mongoose.model('TextbookBuy', TextbookBuy);
