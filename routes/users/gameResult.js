var express = require('express')
const User = require('../../models/user')
let ensureAuthenticated = require('../../config/authUser')
var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {
  req.session.welcome = 'false'
  
  User.findOne({ _id: req.user._id })
  .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      res.render('users/gameResult', { title: 'Winnipitty', user })
    })
})

module.exports = router
