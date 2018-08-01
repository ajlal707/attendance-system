var express = require('express')
const User = require('../models/user')

var router = express.Router()

router.get('/', function (req, res, next) {

  User.findOne({ role: 'admin' }, (err, user) => {

    if (err) return res.json({ error: 'server error try again' })

    res.render('dashboard', { title: 'DashBoard', user: user })

  })
})

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router
