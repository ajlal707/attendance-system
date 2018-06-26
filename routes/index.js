var express = require('express')
var router = express.Router()
const passport = require('passport')
const ensureAuthentication = require('../config/authUser')

router.get('/', function (req, res) {
  res.render('index', { title: 'winnipitty - Login' })
})

router.post('/userLogin', function (req, res, next) {
  passport.authenticate('login', function (err, user, info) {
    if (err) { return next(err) }

    if(!user)  return res.json({error:info.error}) 

    req.logIn(user, function (err) {
      if (err)  return next(err); 

      return res.json({ success: req.user })
    });
  })(req, res, next);
});

//facebook login
router.post('/faceBookLogin',
  passport.authenticate('facebook', { scope: ['email'] })
)

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/login'
  }));
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
  passport.authenticate('google', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/login'
  }));


router.post('/twitterLogin',
  passport.authenticate('twitter'));

router.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users/dashboard');
  });

module.exports = router
