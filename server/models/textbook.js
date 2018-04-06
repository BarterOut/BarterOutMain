import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const textbookSchema = new Schema({
    name: { type: 'String', required: true },
    edition: { type: 'Number', required: true },
    subject: { type: 'String', required: true },
    courseNumber: { type: 'Number', required: true },
    price: { type: 'Number', required: true },
    ISBN: { type: 'Number', required: false },
    condition: { type: 'String', required: true },
    owner: { type: 'String', required: true },
    comments: { type: 'String', required: false },
});



export default mongoose.model('Textbook', textbookSchema);
