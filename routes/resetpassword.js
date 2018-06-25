var express = require('express')
var router = express.Router()

const User = require('../models/user')


router.get('/:token', function (req, res, next) {
  var token = req.params.token;
  res.render('resetpassword', { title: 'Khalis Group - Re-set Password', token: token })
})

router.post('/resetpassword', function (req, res, next) {
  
    if(req.params.token){
     var token = req.params.token
     var password = req.body.password;
    }else{
      var { password, token } = req.body;
    }
    
  User.findOne({ token: token }, (err, user) => {
    if (err) return res.json({ error: err })

    if (!user) return res.json({ error: 'User Not exsist with this token' });

    if (user) {
      user.password = password;
      user.save((err) => {
        if (err) return res.json({ error: err })

        return res.json({ success: 'Password Reset Successfully.Please visit login page', user: user });
      })
    }
  })
})


module.exports = router
