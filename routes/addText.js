var express = require('express')
const User = require('../models/user')
const Texts = require('../models/texts')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

  User.findOne({ _id: req.user._id })
    .populate('photoId')
    .exec(function (err, user) {
      if (err) { return next(err) }

      Texts.find({}, (err, texts) => {
        if (err) { return next(err) }

        res.render('addText', { title: 'Add-Text', user, texts })
      })
    })
})


router.post('/addText', ensureAuthenticated, function (req, res) {
  var { title, description } = req.body;
  Texts.create({
    title: title,
    description: description,

  }, (err, saveText) => {
    if (err) return res.json({ error: 'something happen bad try again.' })

    return res.json({ success: 'success.' })
  })
})

router.post('/deleteText', function (req, res) {
  var id = req.body.textId
  Texts.remove({ _id: id }, (err, todo) => {
    if (err) return res.json({ error: 'something happened bad try again.' })

    return res.json({ success: 'success' })
  })
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
