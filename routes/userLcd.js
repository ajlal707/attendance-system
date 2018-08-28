var express = require('express')
const User = require('../models/user')
const createAd = require('../models/createAd')
var router = express.Router()


router.get('/', function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        res.redirect('/dashboard');
    } else {
        User.findOne({ _id: req.user._id })
            .populate('photoId')
            .exec(function (err, user) {
                if (err) { return next(err) }

                createAd.find({ userId: req.user._id })
                    .populate('userId')
                    .populate('videosId')
                    .populate('textsId')
                    .exec(function (err, userAds) {
                        if (err) { return next(err) }

                        res.render('userLcd', { title: 'User-Lcd', user, userAds })
                    })
            })
    }
})


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
