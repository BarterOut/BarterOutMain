import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const textbookSchema = new Schema({
  name: { type: 'String', required: true },
  edition: { type: 'Number', required: true },
  course: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  status: { type: 'Number', required: true },//status of 0 is not bought probs wants to make this boolean
  ISBN: { type: 'Number', required: false },
  condition: { type: 'String', required: true },
  owner: { type: 'String', required: true },
  comments: { type: 'String', required: false },
  date: { type: 'Number', required: true },
});


// textbookSchema.index({ '$**': 'text' });
textbookSchema.index({ name: 'text', course: 'text', status: 'text', edition: 'text', owner: 'text'}) // can add weights here later!


export default mongoose.model('Textbook', textbookSchema);
