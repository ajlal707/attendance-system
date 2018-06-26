var express = require('express')
var router = express.Router()
var User = require('../models/user')

router.get('/', function (req, res, next) {
  res.render('signup', { title: 'winnipitty - signup' })
})

router.post('/signup', (req, res, next) => {
  var { firstName, lastName, username, email, password, city, state, zipcode } = req.body

  if (firstName && lastName && email && password) {

    User.findOne({ email: email }, function (err, user) {
      if (err) { return next(err) }
      if (user) return res.json({ error: 'User with this email already exists.' })



      User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        city: city,
        state: state,
        zipcode: zipcode,
        role: 'user'
      }, (err, user) => {
        if (err) return res.json({ error: err })

        return res.json({ success: 'success.' })
      })
    })
  } else {
    return res.json({ error: 'Fix the missing fields.' })
  }
})


module.exports = router
