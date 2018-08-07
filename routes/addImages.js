var express = require('express')
var multer = require('multer')
var fs = require('fs')
const crypto = require('crypto')
const User = require('../models/user')
const Attachments = require('../models/attachments')
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
var upload = multer({ storage }).single('galleryImg')


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

router.post('/uploadGalleryImg', ensureAuthenticated, upload, (req, res, next) => {

  if (req.file) {
    const { filename, mimetype, originalname, path } = req.file;
    let ext = ['jpeg', 'png', 'jpg'];

    if (ext.some(s => req.file.mimetype.indexOf(s))) {
      var newAttachments = new Attachments();

      newAttachments.filePath = path;
      newAttachments.fileType = mimetype
      newAttachments.fileName = filename
      newAttachments.title = originalname

      newAttachments.save(function (err) {
        if (err) {
          res.status(500).json(err)
        } else {
          return res.redirect('/addImages')
        }
      })

    } else {
      fs.unlink(path, (err) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json({ message: "Please go back and provide a video with valid extensions (.jpeg,.jpg,.png)" })
      })
    }
  } else {
      return res.status(500).json({ message: "Please go back and choose a file." })
  }
})
router.post('/deleteImage', ensureAuthenticated, function (req, res) {
  var id = req.body.imageId
  console.log(id)
  Attachments.findOne({ _id: id }, (err, todo) => {
    if (err) return res.json({ error: err })

    fs.unlink(todo.filePath, (err) => {
      if (err)
        return res.json(err)

      todo.remove();
      return res.json({ success: 'success' })
    })
  });
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})


module.exports = router
