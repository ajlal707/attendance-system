var express = require('express')
const User = require('../models/user')
const Attendance = require('../models/attendance')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated,  function (req, res, next) {

    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec( async function (err, user) {
            if (err) { return next(err) }

            let users = await User.find({ role: { $ne: 'admin' } })

            res.render('dashboard', { title: 'Dashboard', user, users })
        })
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
