import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const tempUserSchema = new Schema({
  emailAddress: { type: 'String', unique: true, required: true },
  password: { type: 'String', required: true },
  venmoUsername: { type: 'String', required: true },
  CMC: { type: 'String', required: true },
  firstName: { type:'String', required: true },
  lastName: { type:'String', required: true },
  matchedBooks: [{ type: String }],
  // array of matched books so you can look at those books might have to add quotes for it
  university: { type: 'String', required: true },
  emailToken: { type: 'String', required: true },
  createdAt: {
    type: Date, expires: '1h', default: Date.now(), required: true,
  },
},{
  collection: 'tempUsers',
});

// Define schema methods
tempUserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
}

// Define hooks for pre-saving disabled in order to avoid double hashing of passwords
tempUserSchema.pre('save', function (next) {
  if (!this.password) {
    console.log('models/auth.js =======NO PASSWORD PROVIDED=======');


    next();
  } else {
    console.log('models/tempUser.js hashPassword in pre save');

    this.password = this.hashPassword(this.password)
    console.log(this.password)
    next();
  }
})


export default mongoose.model('TempUser', tempUserSchema);