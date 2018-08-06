var User = require('./models/user')
var mongoose = require("mongoose");

//mongo connection
// mongoose.connect('mongodb://maxifjaved:maxifjaved@127.0.0.1:27017/carsOnline?authSource=admin')
mongoose.connect('mongodb://127.0.0.1:27017/carsOnline')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Successfully connected to MongoDB server!')
})

var data = {
    username: 'akkas',
    email: 'akkastest@gmail.com',
    password: '123456',
    role: 'admin',
    createdAt:new Date()
}

User.create(data)
