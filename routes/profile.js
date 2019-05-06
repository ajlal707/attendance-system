var express = require('express')
var multer = require('multer')
var fs = require('fs')
const User = require('../models/user')
const Photo = require('../models/photo')
let ensureAuthenticated = require('../config/authUser')
var router = express.Router()

const crypto = require('crypto')

const DEFAULT_UPLOAD_PATH = './public/uploads/';

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
    req.session.welcome = 'false'

    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(function (err, user) {
            if (err) { return next(err) }

            res.render('profile', { title: 'Admin-Profile', user })
        })
})

router.post('/uploadImage', ensureAuthenticated, upload, (req, res, next) => {
    const { file } = req
    const { originalname, path, filename } = file

    var extension = file.mimetype.split('/').pop()
    if (extension == 'jpeg' || extension == 'png' || extension == 'jpg') {
        Photo.findOne({ userId: req.user._id }).exec((err, photo) => {
            if (err) return res.json({ error: 'something happend bad try again!' })

            if (photo) {
                var pathToDelete = photo.filePath;

                photo.filePath = path;
                photo.fileType = originalname.split('.').pop()
                photo.fileName = filename;

                photo.save((err) => {
                    if (err) return res.json({ error: 'something happend bad try again!' })

                    fs.unlink(pathToDelete, (err) => {
                        if (err)
                            return res.json({ error: 'something happend bad try again!' })

                        return res.json({ success: 'success' })
                    })
                })
            } else {
                //upload new photo
                var newPhoto = new Photo();

                newPhoto.filePath = path;
                newPhoto.fileType = originalname.split('.').pop()
                newPhoto.fileName = filename;
                newPhoto.userId = req.user._id;

                newPhoto.save(function (err, savedNewPhoto) {
                    if (err) {
                        return res.json({ error: 'something happend bad try again!' })
                    } else {
                        User.findOne({ _id: req.user._id }, (err, user) => {
                            if(err)  return res.json({ error: 'something happend bad try again!' })

                            user.photoId = newPhoto._id
                            user.save(function (err) {
                              if(err)  return res.json({ error: 'something happend bad try again!' })


                                return res.json({ success: 'success' })

                            })
                        })
                    }
                })
            }
        })
    } else {
        var pathToDelete = file.path;
        fs.unlink(pathToDelete, (err) => {
            if (err) return res.json({ error: 'something happend bad try again!' })

            return res.json({ error: "Provide a picture with valid extensions (.jpeg,.jpg,.png)" })
        })
    }
})



router.post('/updateprofile', ensureAuthenticated, (req, res, next) => {

    let { username, email } = req.body
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return res.json({ error: err })

        if (!user) return res.json({ error: 'Something happend bad please try again.' })

        user.username = username,
            user.email = email,
            user.save((err) => {
                if (err) return res.json({ error: err })

                return res.json({ success: 'success.' })
            })
    })
})
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
