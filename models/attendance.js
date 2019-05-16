const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const AttendanceSchema = Schema({
  checkIn: { type: String },
  checkOut: { type: String },
  date: { type: Date },
  createdAt: { type: String },
  employeeId: { type: String, ref: "User" },
})


const Attendance = mongoose.model('Attendance', AttendanceSchema)
module.exports = Attendance

