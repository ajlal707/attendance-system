var User = require('./models/user')
var Attendance = require('./models/attendance')
var mongoose = require("mongoose");

//mongo connection
// mongoose.connect('mongodb://maxifjaved:maxifjaved@127.0.0.1:27017/carsOnline?authSource=admin')
mongoose.connect('mongodb://127.0.0.1:27017/attendance')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Successfully connected to MongoDB server!')
})

// var data = {
//     username: 'ajlal',
//     email: 'ajlal@gmail.com',
//     password: '123456',
//     role: 'admin',
//     createdAt:new Date()
// }

// User.create(data);


// var data = {
//     username: 'sabhi',
//     email: 'sabhi@gmail.com',
//     password: '123456',
//     role: 'user',
//     createdAt:new Date()
// }

// User.create(data);
// var data1 = {
//     username: 'aqib',
//     email: 'aqib@gmail.com',
//     password: '123456',
//     role: 'user',
//     createdAt:new Date()
// }

// User.create(data1);


var data = {
    checkIn: '00:10:18',
    checkOut: '00:18:18',
    date: new Date(),
    userId: '5cd01a6139f6bd422cf90807',
    createdAt: new Date()
}
var data1 = {
    checkIn: '00:10:40',
    checkOut: '00:18:02',
    date: new Date(),
    userId: '5cd01a6139f6bd422cf90807',
    createdAt: new Date()
}
var data2 = {
    checkIn: '00:10:11',
    checkOut: '00:18:08',
    date: new Date(),
    userId: '5cd01a6139f6bd422cf90807',
    createdAt: new Date()
}
var data3 = {
    checkIn: '00:10:42',
    checkOut: '00:18:12',
    date: new Date(),
    userId: '5cd01a6139f6bd422cf90807',
    createdAt: new Date()
}

Attendance.create(data);
Attendance.create(data1);
Attendance.create(data2);
Attendance.create(data3);
