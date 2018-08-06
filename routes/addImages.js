var express = require('express')
var multer = require('multer')
var fs = require('fs')
const User = require('../models/user')
const Attachments = require('../models/attachments')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

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

router.post('/uploadGalleryImg', ensureAuthenticated, (req, res, next) => {
  var DIR = './public/attachments/'
  var upload = multer({ dest: DIR }).single('galleryImg')

  var path = ''
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err)
    } else {
      if (req.file) {
        var extension = req.file.originalname.split('.').pop()
        if (extension == 'jpeg' || extension == 'png' || extension == 'jpg') {

          //upload new photo
          var newAttachments = new Attachments();

          newAttachments.filePath = req.file.path;
          newAttachments.fileType = req.file.originalname.split('.').pop()
          newAttachments.fileName = req.file.filename;
          // newAttachments.title = req.body.title;

          newAttachments.save(function (err) {
            if (err) {
              res.status(500).json(err)
            } else {
              return res.redirect('/addImages')
            }
          })
        } else {
          var pathToDelete = req.file.path;
          fs.unlink(pathToDelete, (err) => {
            if (err) {
              return res.status(500).json(err)
            }
            return res.status(200).json({ message: "Please go back and provide a picture with valid extensions (.jpeg,.jpg,.png)" })
          })
        }
      } else {
        return res.json({ message: 'No file choose. choose a file' })
      }
    }
  })
})


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})


module.exports = router
