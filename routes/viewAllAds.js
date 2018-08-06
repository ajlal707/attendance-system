var express = require('express')
const User = require('../models/user')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(function (err, user) {
            if (err) { return next(err) }

            res.render('viewAllAds', { title: 'All-Ads', user })
        })
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
