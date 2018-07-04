var express = require('express')
var router = express.Router()
var User = require('../../models/user')
let ensureAuthenticated = require('../../config/authUser')

router.get('/', ensureAuthenticated, function (req, res, next) {
  User.findOne({ _id: req.user._id })
    .exec(function (err, user) {
      if (err) { return next(err) }

      res.render('admin/addWinner', { title: 'Winnipitty - Dashboard', user })
    })
});
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
