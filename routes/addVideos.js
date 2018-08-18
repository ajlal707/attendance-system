var express = require('express')
var multer = require('multer')
var fs = require('fs')
const User = require('../models/user')
const Videos = require('../models/videos')
const createAd = require('../models/createAd')
const ensureAuthenticated = require('../config/authUser')
const crypto = require('crypto')
var router = express.Router()

const DEFAULT_UPLOAD_PATH = './public/videosFolder/';

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

var upload = multer({ storage }).single('file')


router.get('/', ensureAuthenticated, function (req, res, next) {

  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      Videos.find({}, (err, videos) => {
        if (err) { return next(err) }

        res.render('addVideos', { title: 'Add-Videos', user, videos })
      })
    })
})


router.post('/uploadGalleryVideo', ensureAuthenticated, upload, (req, res, next) => {

  if (req.file) {
    const { filename, mimetype, originalname, path } = req.file;
    let uploadingType = mimetype.split('/').pop()
    let ext = 'mp4';

    if (ext === uploadingType) {
      var newVideos = new Videos();

      newVideos.filePath = path;
      newVideos.fileType = mimetype
      newVideos.fileName = filename;
      newVideos.title = originalname;

      newVideos.save((err) => {
        if (err) return res.status(500).json(err)

        return res.redirect('/addVideos')
      })

    } else {
      fs.unlink(path, (err) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json({ message: "Please go back and provide a video with valid extensions (.mp4)" })
      })
    }
  } else {
    return res.status(200).json({ message: "Please go back and choose a file." })
  }
})


router.post('/deleteVideo', ensureAuthenticated, function (req, res) {
  var id = req.body.videoId

  createAd.findOne({ videosId: id }, (err, existAd) => {
    if (err) return res.json({ error: err })

    if (existAd) return res.json({ error: 'This video is use in ad' })

    Videos.findOne({ _id: id }, (err, todo) => {
      if (err) return res.json({ error: err })

      fs.unlink(todo.filePath, (err) => {
        if (err)
          return res.json(err)

        todo.remove();
        return res.json({ success: 'success' })
      })
    })
  });
})



router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
