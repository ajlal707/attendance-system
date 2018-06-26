var express = require('express')
var router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const jwt = require('../config/jwt')

router.get('/', function (req, res) {
  res.render('index', { title: 'winnipitty - Login' })
})

router.post('/userLogin', function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (err) { return next(err) }

    if (!user) return res.json({ error: info.error })


    const token = jwt.createToken(user._id)
    user.token = token
    user.save((err) => {
      if (err) return res.json({ error: 'something happen bad.' })

      req.logIn(user, function (err) {
        if (err) return next(err);

        return res.json({ success: req.user })
      })
    })
  })(req, res, next);
});

//facebook login
router.post('/faceBookLogin',
  passport.authenticate('facebook', { scope: ['email'] })
)

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    if (req.user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/users/dashboard');
    }
  });


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})

//gmail login
router.post('/googleLogin',
  passport.authenticate('google', {
    scope:
      ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
  }
  ));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    if (req.user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/users/dashboard');
    }
  });

// twitter login
router.post('/twitterLogin',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    if (req.user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/users/dashboard');
    }
  });

module.exports = router
