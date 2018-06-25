var nodemailer = require('nodemailer');


let email = {
    from: 'akkastest@gmail.com',
    to: '',
    subject: 'Forgot Password',
};
var smtp = {
    service: 'gmail',
    user: 'akkastest@gmail.com',
    pass: 'cjmudaric#@!123'

};

module.exports = {
    email,
    smtp
}