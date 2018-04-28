const express = require('express')
const router = express.Router()
import User from '../models/newUser';
const passport = require('../passport')

// THIS FUNCTION WORKS
router.post('/signup', (req, res) => {
    const { emailAddress, password, CMC, venmoUsername } = req.body;

    // TODO: ADD VALIDATION
    User.findOne({ emailAddress: emailAddress }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${emailAddress}`
            })
        }
        else {
            const newUser = new User({
                emailAddress: emailAddress,
                password: password,
                CMC: CMC,
                venmoUsername: venmoUsername
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

// THIS ONE IS Partially working
router.post('/login', (req, res) => {
    console.log('working1');
    const { emailAddress, password } = req.body;

    User.findOne({ emailAddress: emailAddress }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!user) {
            res.json(false);
            // return done(null, false, { message: 'Incorrect username' })
            return;
        }
        if (!user.checkPassword(password)) {
            res.json(false);
            // return done(null, false, { message: 'Incorrect password' })
            return;
        }
        let userToReturn = {};
        res.json(user);
    })
})

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

module.exports = router;