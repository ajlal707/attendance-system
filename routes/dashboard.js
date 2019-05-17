var express = require('express')
const User = require('../models/user')
const Leave = require('../models/leave')
const ensureAuthenticated = require('../config/authUser')

var router = express.Router()

router.get('/', ensureAuthenticated, function (req, res, next) {

    User.findOne({ _id: req.user._id })
        .populate('photoId')
        .exec(async function (err, user) {
            if (err) { return next(err) }

            let users = await User.find({ role: { $ne: 'admin' } })
            let leaves = await Leave.find({ status: { $eq: 'pending' } });

            let emplId = '';
            let userObj = '';
            for (let i = 0; i < leaves.length; i++) {
                emplId = leaves[i].empId;
                userObj = await User.findOne({ employeeId: emplId });
                leaves[i].username = userObj.username;
            }
            debugger
            res.render('dashboard', { title: 'Dashboard', user, users, leaves })
        })
})

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
