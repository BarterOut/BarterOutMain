import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// const dbConnection = require('./database')
// const user = require('./routes/user')

const newUserSchema = new Schema({


    emailAddress: { type: 'String', required: true },
    password: { type: 'String', required: true },
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

newUserSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('models/user.js =======NO PASSWORD PROVIDED=======')
        next()
    } else {
        console.log('models/user.js hashPassword in pre save');

        this.password = this.hashPassword(this.password)
        next()
    }
})



;



export default mongoose.model('NewUser', newUserSchema);
