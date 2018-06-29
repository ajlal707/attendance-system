var User = require('./models/user')
var mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs')

//mongo connection
mongoose.connect('mongodb://maxifjaved:maxifjaved@127.0.0.1:27017/winnipitty?authSource=admin')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Successfully connected to MongoDB server!')
})

var data = {
    firstName: 'akkas',
    lastName: 'tech',
    email: 'akkastest@gmail.com',
    password: '123456',
    role: 'admin',
}

User.create(data)
