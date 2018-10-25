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

                res.render('createAds', { title: 'Create-Ads', user, attachments, videos, users, texts, result })
              })
            })
          })
        })
      })
    })
})



router.post('/createAd', ensureAuthenticated, (req, res, next) => {

  var { userId, imageId, textId, videoId, duration, template } = req.body;


  if (userId && duration) {
    createAd.create({
      userId: userId,
      imageId: imageId,
      videosId: videoId,
      textsId: textId,
      duration: duration,
      templateId: template,


    }, (err, createdAd) => {
      if (err) return res.json({ message: "Mandetory parameters missing." })

      if (createdAd) {
        User.findOne({ _id: userId }, (err, user) => {
          if (err) return res.json({ message: "something happen bad try again." })

          user.createAdId.push(createdAd._id);
          user.save((err) => {
            if (err) return res.json({ message: "something happen bad try again." })
          })
        })
      }
      if (imageId) {
        Attachments.findOne({ _id: imageId }, (err, imageData) => {
          if (err) return res.json({ message: "something happen bad try again." })

          imageData.createAdId.push(createdAd._id);
          imageData.save((err) => {
            if (err) return res.json({ message: "something happen bad try again." })

          })
        })
      }
      if (videoId) {
        Videos.findOne({ _id: videoId }, (err, videoData) => {
          if (err) return res.json({ message: "something happen bad try again." })

          videoData.createAdId.push(createdAd._id);
          videoData.save((err) => {
            if (err) return res.json({ message: "something happen bad try again." })

          })
        })
      }
      if (textId) {
        Texts.findOne({ _id: textId }, (err, textData) => {
          if (err) return res.json({ message: "something happen bad try again." })

          textData.createAdId.push(createdAd._id);
          textData.save((err) => {
            if (err) return res.json({ message: "something happen bad try again." })

          })
        })
      }
      return res.json({ success: "success." })
    })
  } else {
    return res.status(200).json({ message: "Mandetory parameters missing." })
  }
})


router.post('/createAdNew', ensureAuthenticated, (req, res) => {

  var { userId, duration, template } = req.body;
  let imageIds = req.body['imageIds[]']
  let textIds = req.body['textIds[]']


  if (userId && duration) {
    createAd.create({
      userId: userId,
      imageIds: imageIds,
      textIds: textIds,
      duration: duration,
      templateId: template,


    }, (err, createdAd) => {
      if (err) return res.json({ message: "Mandetory parameters missing." })

      if (createdAd) {
        User.findOne({ _id: userId }, (err, user) => {
          if (err) return res.json({ message: "something happen bad try again." })

          user.createAdId.push(createdAd._id);
          user.save((err) => {
            if (err) return res.json({ message: "something happen bad try again." })
          })
        })
      }
      if (typeof (imageIds) === 'object') {
        for (let i = 0; i < imageIds.length; i++) {
          Attachments.findOne({ _id: imageIds[i] }, (err, imageData) => {
            if (err) return res.json({ message: "something happen bad try again." })

            imageData.createAdId.push(createdAd._id);
            imageData.save()

          })
        }
      } else {
        Attachments.findOne({ _id: imageIds }, (err, imageData) => {
          if (err) return res.json({ message: "something happen bad try again." })

          imageData.createAdId.push(createdAd._id);
          imageData.save()

        })
      }

      if (typeof (textIds) === 'object') {
        for (let i = 0; i < textIds.length; i++) {
          Texts.findOne({ _id: textIds[i] }, (err, textData) => {
            if (err) return res.json({ message: "something happen bad try again." })

            textData.createAdId.push(createdAd._id);
            textData.save()
          })
        }
      } else {
        Texts.findOne({ _id: textIds }, (err, textData) => {
          if (err) return res.json({ message: "something happen bad try again." })

          textData.createAdId.push(createdAd._id);
          textData.save()
        })
      }
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
