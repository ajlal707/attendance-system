var express = require('express')
var router = express.Router()
var User = require('../../models/user')
let ensureAuthenticated = require('../../config/authUser')

router.get('/', ensureAuthenticated, function (req, res, next) {
  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      User.find({role:{$ne:'admin'}}, (err, users) => {
        if (err) { return next(err) }

        res.render('admin/usersList', { title: 'Users-List', user, users })

      })
    })
});
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
