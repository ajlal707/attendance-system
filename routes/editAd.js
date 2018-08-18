var express = require('express')
const User = require('../models/user')
const Attachments = require('../models/attachments')
const Videos = require('../models/videos')
const Texts = require('../models/texts')
const createAd = require('../models/createAd')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {


    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(function (err, user) {
            if (err) { return next(err) }

            Attachments.find({}, (err, attachments) => {
                if (err) { return next(err) }

                Videos.find({}, (err, videos) => {
                    if (err) { return next(err) }

                    User.find({ role: { $ne: 'admin' } }, (err, users) => {
                        if (err) { return next(err) }

                        Texts.find({}, (err, texts) => {
                            if (err) { return next(err) }

                            var result = ''

                            res.render('createAds', { title: 'Create-Ads', user, attachments, videos, users, texts, result })
                        })
                    })
                })
            })
        })
})


router.get('/:id', ensureAuthenticated, function (req, res, next) {

    let { id } = req.params
    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(function (err, user) {
            if (err) { return next(err) }

            Attachments.find({}, (err, attachments) => {
                if (err) { return next(err) }

                Videos.find({}, (err, videos) => {
                    if (err) { return next(err) }

                    User.find({ role: { $ne: 'admin' } }, (err, users) => {
                        if (err) { return next(err) }

                        Texts.find({}, (err, texts) => {
                            if (err) { return next(err) }

                            createAd.findById(id, function (err, result) {
                                if (err) { return next(err) }
                    
                                req.session.resultId = result._id
                                res.render('editAd', { title: 'Edit-Ad', user, attachments, videos, users, texts, result })
                            })
                        })
                    })
                })
            })
        })
})

router.post('/getResult', ensureAuthenticated, function (req, res, next) {

    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(function (err, user) {
            if (err) res.json({ error: 'error' })

            Attachments.find({}, (err, attachments) => {
                if (err) res.json({ error: 'error' })

                Videos.find({}, (err, videos) => {
                    if (err) res.json({ error: 'error' })

                    User.find({ role: { $ne: 'admin' } }, (err, users) => {
                        if (err) res.json({ error: 'error' })

                        Texts.find({}, (err, texts) => {
                            if (err) res.json({ error: 'error' })

                            createAd.findById(req.session.resultId, function (err, result) {
                                if (err) res.json({ error: 'error' })

                                
                                res.json({ success: 'success', user, attachments, videos, users, texts, result })
                            })
                        })
                    })
                })
            })
        })
})



router.post('/update', ensureAuthenticated, function (req, res, next) {

    var { adIdForUpdate, userId, imageId, textId, videoId, duration, template } = req.body;
    console.log(adIdForUpdate, userId, imageId, textId, videoId, duration, template);

    createAd.findOne({ _id: adIdForUpdate }, (err, adObject) => {
        if (err) return res.json({ error: 'error' })

        if (adObject) {
            adObject.userId = userId
            adObject.imageId = imageId
            adObject.videosId = videoId
            adObject.textsId = textId
            adObject.duration = duration
            adObject.templateId = template
            adObject.save((err) => {
                if (err) return res.json({ error: 'error' })

                var calledUrl = req.session.CalledUrl
                return res.json({ success: 'success', calledUrl })
            })
        } else {
            return res.json({ error: 'try again.' })
        }
    })

})
router.get('/logout', function (req, res) {
    
    req.logout();
    res.redirect('/');
})

module.exports = router
