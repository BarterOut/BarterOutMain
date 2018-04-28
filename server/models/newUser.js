import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// const dbConnection = require('./database')
// const user = require('./routes/user')

const newUserSchema = new Schema({


    emailAddress: { type: 'String', required: true },
    password: { type: 'String', required: true },
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




// newUserSchema.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, null, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });
//
// newUserSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

// Define schema methods
//
// newUserSchema.methods = {
//
//     checkPassword: function (inputPassword) {
//
//         return bcrypt.compareSync(inputPassword, this.password)
//
//     },
//
//     hashPassword: plainTextPassword => {
//
//         return bcrypt.hashSync(plainTextPassword, 10)
//
//     }
//
// }
//
// newUserSchema.pre('save', function (next) {
//     if (!this.password) {
//         console.log('models/user.js =======NO PASSWORD PROVIDED=======')
//         next()
//     } else {
//         console.log('models/user.js hashPassword in pre save');
//
//         this.password = this.hashPassword(this.password)
//         next()
//     }
// })



// ;
//
// const NewUser = mongoose.model('NewUser', newUserSchema)
// module.exports = NewUser
export default mongoose.model('NewUser', newUserSchema);
