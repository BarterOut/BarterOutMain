import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TextbookBuy = new Schema({
    name: { type: 'String', required: true },
    course: { type: 'String', required: true },
    status: { type: 'Number', required: true},
    owner: { type: 'String', required: true },
    date: { type: 'Number', required: true}
},{
  collection: 'booksWanted'
});

TextbookBuy.index({'$**': 'text'});

export default mongoose.model('TextbookBuy', TextbookBuy);
