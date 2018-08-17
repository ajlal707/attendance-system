var express = require('express')
const User = require('../models/user')
const Attachments = require('../models/attachments')
const createAd = require('../models/createAd')
const Photo = require('../models/photo')
const Texts = require('../models/texts')
const Videos = require('../models/videos')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      createAd.find({})
        .populate('userId')
        .populate('imageId')
        .populate('videosId')
        .populate('textsId')
        .exec(function (err, allAds) {
          if (err) { return next(err) }

          Attachments.find({}, (err, images) => {
            if (err) { return next(err) }

            Videos.find({}, (err, videos) => {
              if (err) { return next(err) }

              User.find({}, (err, users) => {
                if (err) { return next(err) }

                res.render('dashboard', { title: 'Dashboard', user, allAds, users, videos, images })

              })
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
