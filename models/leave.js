var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LeaveSchema = mongoose.Schema({
  startDate: { type: String },
  endDate: { type: String },
  reason: { type: String },
  noOfLeaves: { type: String },
  status: { type: String, default: 'pending' },
  empId: { type: String },
})

var Leave = mongoose.model('Leave', LeaveSchema)
module.exports = Leave
