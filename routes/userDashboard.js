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

            // let leaves = await Leave.find({ $and: [{ employeeId: req.user.employeeId }, { status: "pending" }] });
            let leaves = await Leave.find({ empId: req.user.employeeId });

            res.render('userDashboard', { title: 'User-Dashboard', user, leaves })
        })
})

router.post('/applyUserLeave', ensureAuthenticated, async function (req, res, next) {

    let { startDate, endDate, reason } = req.body;
    // get difference in daye
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(startDate);
    var secondDate = new Date(endDate);
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    debugger
    let user = await User.findOne({ _id: req.user._id })
    let userPendingLeaves = user.pendingLeaves * 1;
    if (userPendingLeaves > diffDays) {
        if (startDate && endDate && reason) {

            Leave.create({
                startDate: startDate,
                endDate: endDate,
                reason: reason,
                noOfLeaves: diffDays,
                empId: req.user.employeeId,
            }, async function (err, leave) {

                if (err) if (err) return res.json({ error: 'something bad please try again' })

                user.pendingLeaves = userPendingLeaves - diffDays;
                await user.save();

                return res.json({ success: 'success' })
            })
        } else {
            return res.json({ error: 'something happend bad please try again.' })
        }
    } else {
        return res.json({ error: 'You have enough leaves to aplly.' })
    }

})


router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router
