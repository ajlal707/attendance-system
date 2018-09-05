var express = require('express')
const User = require('../models/user')
const createAd = require('../models/createAd')
var router = express.Router()


router.get('/', function (req, res, next) {
    if (req.user === undefined) {
        res.redirect('/dashboard');
    } else {
        if (req.user.role === 'user') {
            User.findOne({ _id: req.user._id })
                .populate('photoId')
                .exec(function (err, user) {
                    if (err) { return next(err) }

                    createAd.find({ userId: req.user._id })
                        .populate('userId')
                        .populate('imageId')
                        .populate('videosId')
                        .populate('textsId')
                        .exec(function (err, userAds) {
                            if (err) { return next(err) }

                            res.render('userLcd', { title: 'User-Lcd', user, userAds })
                        })
                })
        } else {
            res.redirect('/dashboard');
        }
    }
})

router.get('/getResult', function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return res.json({ error: 'not an admin' })
    } else {
        User.findOne({ _id: req.user._id })
            .populate('photoId')
            .exec(function (err, user) {
                if (err) return res.json({ error: 'not an admin' })

                createAd.find({ userId: req.user._id })
                    .populate('userId')
                    .populate('imageId')
                    .populate('videosId')
                    .populate('textsId')
                    .exec(function (err, userAds) {
                        if (err) { return next(err) }

                        return res.json({ userAds, user })
                    })
            })
    }
})
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
