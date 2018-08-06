var express = require('express')
const User = require('../models/user')
const Photo = require('../models/photo')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

    User.findOne({ _id: req.user._id })
        .populate('photoId').exec(function (err, user) {
            if (err) { return next(err) }

            User.find({ role: { $ne: 'admin' } }, (err, users) => {
                if (err) { return next(err) }

                res.render('viewAllUsers', { title: 'Dashboard', user, users })
            })
        })
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
