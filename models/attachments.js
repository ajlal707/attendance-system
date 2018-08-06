var mongoose = require('mongoose')
var schema = mongoose.Schema

var AttachmentsSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String },
  fileType: { type: String },
  title: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" }
})

var Attachments = mongoose.model('Attachments', AttachmentsSchema)
module.exports = Attachments

