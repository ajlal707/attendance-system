var express = require('express')
var multer = require('multer')
var fs = require('fs')
const User = require('../../models/user')
const Photo = require('../../models/photo')
let ensureAuthenticated = require('../../config/authUser')
var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {
  req.session.welcome = 'false'

  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      var sinceDate = user.createdAt;
      sinceDate = sinceDate.split(' ')
      var joinUserDate = sinceDate[1] + ',' + sinceDate[2] + ',' + sinceDate[3]
      res.render('users/profile', { title: 'Winnipitty', user ,joinUserDate})
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

                  res.redirect('/users/profile')
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

                      res.redirect('/users/profile')
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
            return res.status(200).json({ message: "Please go back and provide a picture with valid extensions (.jpeg,.jpg,.png)" })
          })
        }
      } else {
        return res.json({ message: 'No file choose. choose a file' })
      }
    }
  })
})

router.post('/updateprofile', ensureAuthenticated, (req, res, next) => {

  let { firstName, lastName, email, address, city, state, country, zipcode, streetAddress, phoneNumber } = req.body
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return res.json({ error: err })

    if (!user) return res.json({ error: 'Something happend bad please try again.' })

    user.firstName = firstName,
      user.lastName = lastName,
      user.address = address,
      user.city = city,
      user.state = state,
      user.country = country,
      user.zipcode = zipcode,
      user.email = email,
      user.streetAddress = streetAddress,
      user.phoneNumber = phoneNumber
    user.save((err) => {
      if (err) return res.json({ error: err })

      return res.json({ success: 'success.' })
    })
  })
})

module.exports = router
