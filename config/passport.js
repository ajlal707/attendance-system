const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')

module.exports = function () {
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })
  // PASSPORT LOCAL STRATEGY
  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (error, user) {
      if (error)
        return done(error)

      if (!user)
        return done(null, false, { error: 'User with this email not found.' }) // req.flash is the way to set flashdata using connect-flash

      bcrypt.compare(password, user.password, (error, matched) => {
        if (error) return done(error)

        if (matched) return done(null, user)

        return done(null, false, { error: 'Invalid password.' })
      });
      
    })
  }))
}
// authenticate via facebook
passport.use(new FacebookStrategy({
  clientID: "126323524608997", // Use your Facebook App Id
  clientSecret: "b769eb00970dec2989b94801b6db4314", // Use your Facebook App Secret
  callbackURL: "http://18.219.229.227:3000/facebook/callback",
  profileFields: ['id', 'email', 'name'] //This
},
  function (token, tokenSecret, profile, done) {
    if (!profile) {
      return done(err)
    } else {
      User.findOne({ email: profile.emails[0].value }).then(function (user, err) {
        if (user) {
          done(null, user)
        } else {
          User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: profile.emails[0].value,
            role: 'user'
          }).then((user, err) => {
            if (err) {
              return done(err)
            } else {
              done(null, user)
            }
          })
        }
      })
    }
  }
));