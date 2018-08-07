var express = require('express')
const User = require('../models/user')
const Attachments = require('../models/attachments')
const Videos = require('../models/videos')
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

            res.render('createAds', { title: 'Create-Ads', user, attachments, videos, users })

          })
        })
      })

    })
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
