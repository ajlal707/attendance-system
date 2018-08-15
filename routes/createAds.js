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

              res.render('createAds', { title: 'Create-Ads', user, attachments, videos, users, texts })
            })
          })
        })
      })

    })
})



router.post('/createAd', ensureAuthenticated, (req, res, next) => {

  var { userId, imageId, textId, title, videoId, duration, template } = req.body;


  if (userId && duration) {
    createAd.create({
      userId: userId,
      imageId: imageId,
      videoId: videoId,
      textId: textId,
      textTitle: title,
      duration: duration,
      templateId: template,

    }, (err, createdAd) => {
      if (err) return res.json({ message: "Mandetory parameters missing." })

      return res.json({ success: "success." })
    })

  } else {
    return res.status(200).json({ message: "Mandetory parameters missing." })
  }
})
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
