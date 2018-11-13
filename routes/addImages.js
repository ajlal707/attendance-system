var express = require('express')
var multer = require('multer')
var fs = require('fs')
const crypto = require('crypto')
const User = require('../models/user')
const Attachments = require('../models/attachments')
const createAd = require('../models/createAd')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

const DEFAULT_UPLOAD_PATH = './public/attachments/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DEFAULT_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    let customFileName = crypto.randomBytes(18).toString('hex'),
      originalname = file.originalname,
      fileExtension = originalname.substring(originalname.lastIndexOf('.') + 1, originalname.length) || originalname;
    cb(null, customFileName + '.' + fileExtension)
  }
})
var upload = multer({ storage }).array('galleryImg')


router.get('/', ensureAuthenticated, function (req, res, next) {

  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      Attachments.find({}, (err, attachments) => {
        if (err) { return next(err) }

        res.render('addImages', { title: 'Add-Images', user, attachments })
      })
    })
})

router.post('/uploadGalleryImg', ensureAuthenticated, upload, async (req, res, next) => {

  if (req.files.length > 0) {
    let uploadAbleFiles = req.files
    for (let i of uploadAbleFiles) {
      const { filename, mimetype, originalname, path } = i;
      var newAttachments = new Attachments();

      newAttachments.filePath = path;
      newAttachments.fileType = mimetype;
      newAttachments.fileName = filename;
      newAttachments.title = originalname;

      await newAttachments.save();
    }

    return res.json({ success: "success." })

  } else {
    return res.json({ error: "Please choose a file." })
  }
})
router.post('/deleteImage', ensureAuthenticated, function (req, res) {
  var id = req.body.imageId
  Attachments.findOne({ _id: id }, (err, todo) => {
    if (err) return res.json({ error: err })

    createAd.findOne({ imageId: id }, (err, existAd) => {
      if (err) return res.json({ error: err })

      if (existAd) return res.json({ error: 'This image is in use of ads' })

      createAd.findOne({ imageIds: id }, (err, existsAd) => {
        if (err) return res.json({ error: err })

        if (existsAd) return res.json({ error: 'This image is in use of ads' })

        fs.unlink(todo.filePath, (err) => {
          if (err)
            return res.json(err)

          todo.remove();
          return res.json({ success: 'success' })
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
