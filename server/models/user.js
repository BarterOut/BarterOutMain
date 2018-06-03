import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  emailAddress: { type: 'String', required: true },
});


export default mongoose.model('User', userSchema);
