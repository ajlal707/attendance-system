var express = require('express')
var router = express.Router()

const User = require('../models/user')


router.get('/:token', function (req, res, next) {
  var token = req.params.token;
  res.render('resetpassword', { title: 'Reset-Password', token: token })
})

router.post('/resetpassword', function (req, res, next) {

  var body = req.body;
  User.findOne({ token: body.token }, (err, user) => {
    if (err) return res.json({ error: err })

    if (!user) return res.json({ error: 'User Not exsist with this token' });

    if (user) {
      user.password = body.password;
      user.save((err) => {
        if (err) return res.json({ error: err })

        return res.json({ success: 'Password Reset Successfully.Please visit login page', user: user });
      })
    }else{
      return res.json({ error: 'token expire please try again.' });
    }
  })
})


module.exports = router
