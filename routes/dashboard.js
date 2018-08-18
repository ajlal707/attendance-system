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

                req.session.CalledUrl = req.originalUrl
                res.render('dashboard', { title: 'Dashboard', user, allAds, users, videos, images })

              })
            })
          })
        })
    })
})


router.post('/deleteAd', function (req, res) {
  var id = req.body.adId
  createAd.findOne({ _id: id }, (err, existAd) => {
      if (err) return res.json({ error: err })


      var adObject = existAd
      if (adObject.videosId) {
          Videos.findOne({ _id: adObject.videosId }, (err, videoObject) => {
              if (err) return res.json({ error: err })

              var createadArray = videoObject.createAdId
              var indexOfId = createadArray.indexOf(adObject.videosId)

              createadArray = createadArray.splice(indexOfId, 1)
              videoObject.createAdId = createadArray
              videoObject.save((err) => {
                  if (err) return res.json({ error: err })

              })
          })
      }
      if (adObject.textsId) {
          Texts.findOne({ _id: adObject.textsId }, (err, textsObject) => {
              if (err) return res.json({ error: err })

              var createadArray = textsObject.createAdId
              var indexOfId = createadArray.indexOf(adObject.textsId)

              createadArray = createadArray.splice(indexOfId, 1)
              textsObject.createAdId = createadArray
              textsObject.save((err) => {
                  if (err) return res.json({ error: err })

              })
          })
      }
      if (adObject.userId) {
          User.findOne({ _id: adObject.userId }, (err, userObject) => {
              if (err) return res.json({ error: err })

              var createadArray = userObject.createAdId
              var indexOfId = createadArray.indexOf(adObject.textsId)

              createadArray = createadArray.splice(indexOfId, 1)
              userObject.createAdId = createadArray
              userObject.save((err) => {
                  if (err) return res.json({ error: err })

              })
          })
      }
      if (adObject.imageId) {
          Attachments.findOne({ _id: adObject.imageId }, (err, imageObject) => {
              if (err) return res.json({ error: err })

              var createadArray = imageObject.createAdId
              var indexOfId = createadArray.indexOf(adObject.imageId)

              createadArray = createadArray.splice(indexOfId, 1)
              imageObject.createAdId = createadArray
              imageObject.save((err) => {
                  if (err) return res.json({ error: err })

              })
          })
      }
      existAd.remove();
      return res.redirect('/dashboard')
  })
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
