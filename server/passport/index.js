const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const newUser = require('../models/newUser')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((newUser, done) => {
    console.log('*** serializeUser called, user: ')
    console.log(newUser) // the whole raw user object!
    console.log('---------')
    done(null, { _id: newUser._id })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    console.log('DeserializeUser called')
    newUser.findOne(
        { _id: id },
        'username',
        (err, newUser) => {
            console.log('*** Deserialize user, user:')
            console.log(newUser)
            console.log('--------------')
            done(null, newUser)
        }
    )
})

//  Use Strategies
passport.use(LocalStrategy);

module.exports = passport;