var express = require('express')
var multer = require('multer')
var fs = require('fs')
const User = require('../../models/user')
let ensureAuthenticated = require('../../config/authUser')
var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {
  req.session.welcome = 'false'
  
  User.findOne({ _id: req.user._id })
  .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      res.render('users/enterTrive', { title: 'Winnipitty', user })
    })
})

module.exports = router
