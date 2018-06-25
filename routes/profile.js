var express = require('express')
var multer = require('multer')
var fs = require('fs')
const User = require('../models/user')
const Photo = require('../models/photo')
let ensureAuthenticated = require('../config/authUser')
var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {
  req.session.welcome = 'false'
  
  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      res.render('profile', { title: 'Khalis Group - Edit Profile', user })
    })
})

router.post('/uploadImage', ensureAuthenticated, (req, res, next) => {
  var DIR = './public/uploads/'
  //define the type of upload multer would be doing 
  // and pass in its destination, in our case, its a single file with the name photo
  var upload = multer({ dest: DIR }).single('profilePhoto')
  var path = ''

  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json(err)
    } else {
      if (req.file) {
        var extension = req.file.originalname.split('.').pop()
        if (extension == 'jpeg' || extension == 'png' || extension == 'jpg') {

          Photo.findOne({ userId: req.user._id }).exec((err, photo) => {
            if (err) return res.json({ error: 'something happend bad try again!' })

            if (photo) {
              var pathToDelete = photo.filePath;

              photo.filePath = req.file.path;
              photo.fileType = req.file.originalname.split('.').pop()
              photo.fileName = req.file.filename;

              photo.save((err) => {
                if (err) return res.json({ error: err })

                fs.unlink(pathToDelete, (err) => {
                  if (err)
                    return res.status(500).json(err)

                  res.redirect('/profile')
                })
              })
            } else {
              //upload new photo
              var newPhoto = new Photo();

              newPhoto.filePath = req.file.path;
              newPhoto.fileType = req.file.originalname.split('.').pop()
              newPhoto.fileName = req.file.filename;
              newPhoto.userId = req.user._id;

              newPhoto.save(function (err, savedNewPhoto) {
                if (err) {
                  res.status(500).json(err)
                } else {
                  User.findOne({ _id: req.user._id }, (err, user) => {
                    if (err) console.log('SOme error ')
                    user.photoId = newPhoto._id
                    user.save(function (err) {
                      if (err) return res.json({ error: 'something happend bad' })

                      res.redirect('/profile')
                    })
                  })
                }
              })
            }
          })
        } else {
          var pathToDelete = req.file.path;
          fs.unlink(pathToDelete, (err) => {
            if (err) {
              return res.status(500).json(err)
            }
            return res.status(200).json({
              message: "Please go back and provide a picture with valid extensions (.jpeg,.jpg,.png)"
            })
          })
        }
      } else {
        return res.json({ message: 'No file choose. choose a file' })
      }
    }
  })
})

router.post('/updateprofile', ensureAuthenticated, (req, res, next) => {
  let { firstname, lastname, address } = req.body
  if (firstname && lastname && address) {
    User.findByIdAndUpdate({ _id: req.user._id }, {
      firstname,
      lastname,
      address
    }, (err, user) => {
      if (err) return res.json({ error: err })

      return res.json({ success: 'User updated successfully.' });
    })
  } else {
    return res.json({ error: 'Fix the missing fields.' });
  }
})

module.exports = router