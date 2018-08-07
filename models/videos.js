var mongoose = require('mongoose')
var schema = mongoose.Schema

var VideosSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String },
  fileType: { type: String },
  title: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" }
})

var Videos = mongoose.model('Videos', VideosSchema)
module.exports = Videos

