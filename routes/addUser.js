var express = require('express')
const User = require('../models/user')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(function (err, user) {
            if (err) { return next(err) }

            res.render('addUser', { title: 'Add-User', user })
        })
})

router.post('/addNewUser', ensureAuthenticated, function (req, res, next) {

    var body = req.body;
    User.findOne({ email: body.email }, (err, user) => {
        if (err) return res.json({ error: 'something bad please try again' })

        if (user) return res.json({ error: 'user with this email alreadt exist.' })

        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: 'user',
        }, (err, user) => {
            if (err) return res.json({ error: 'something bad please try again' })

            return res.json({ success: 'success' })
        })

    })
})


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
