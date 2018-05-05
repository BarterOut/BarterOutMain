import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

const newUserSchema = new Schema({
    emailAddress: { type: 'String', required: true },
    password: { type: 'String', required: true },
    venmoUsername: { type: 'String', required: true },
    CMC: { type: 'String', required: true },
    firstName: {type:'String', required: true},
    lastName: {type:'String', required: true},
    matchedBooks: [{type:String}],//array of matched books so you can look at those books might have to add quotes for it
    univeristy: {type: 'String', required: true},
},{
    collection: 'userInfo'
})

// Define schema methods
newUserSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
}

// Define hooks for pre-saving
newUserSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('models/user.js =======NO PASSWORD PROVIDED=======')


        next()
    } else {
        console.log('models/user.js hashPassword in pre save');

        this.password = this.hashPassword(this.password)
        console.log(this.password)
        next()
    }
})
export default mongoose.model('NewUser', newUserSchema);