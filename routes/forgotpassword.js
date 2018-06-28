var express = require('express')
const MailENV = require('../config/mailEnv')
var nodemailer = require('nodemailer');
const User = require('../models/user')

var router = express.Router()

router.get('/', function (req, res, next) {
  res.render('forgotpassword', { title: 'Khalis Group - Reset Password' })
})

router.post('/forgetPassword', function (req, res, next) {
  var email = req.body.email;
  User.findOne({ email: email }, (err, user) => {
    if (err) return res.json({ error: err })

    if (!user) return res.json({ error: 'User with this email doesn\'t exists.' })

    if (user.token) {
      let mailOptions = {
        from: MailENV.email.from,
        to: user.email,
        subject: MailENV.email.subject,
        html: `<p style="font-weight: bold;">Hi,</p>
                <p>We\'ve received a request to reset your password.
                If you didnt make this request, just ignore this email.
                Otherwise you can reset your password using the link below.</p>
                <p>Thanks</p><p>Winnipitty</p><div style="text-align: center">
                <a style="color: white; text-decoration: underline; background: #d18e54; width: 250px; display: block; margin: auto; line-height: 25px; text-decoration: none; border-radius: 3px;"
                 href="http://18.219.229.227:3000/resetpassword/${user.token}">Click here to reset your password.</a></div>`
      };
      var transporter = nodemailer.createTransport({
        service: MailENV.smtp.service,
        auth: {
          user: MailENV.smtp.user,
          pass: MailENV.smtp.pass
        }
      });

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) return res.json({ error: err })

        return res.json({ success: 'Password Reset Email Sent Successfully' });
      });
    } else {
      return res.json({ success: 'No user found with such email.' });
    }
  })
})

module.exports = router
