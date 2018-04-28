const express = require('express')
const router = express.Router()
const NewUser = require('../models/newUser')
import User from '../models/newUser';
const passport = require('../passport')
// var UserDetails = mongoose.model('userInfo', UserDetail);
router.post('/', (req, res) => {
    console.log('user signup');

    const { emailAddress, password } = req.body

    // ADD VALIDATION
    User.findOne({ emailAddress: emailAddress }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${emailAddress}`
            })
        }
        else {
            console.log(emailAddress);
            console.log(password);


            const newUser = new User({

                emailAddress: emailAddress,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            emailAddress: req.user.emailAddress
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router