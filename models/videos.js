var mongoose = require('mongoose')
var schema = mongoose.Schema

var VideosSchema = mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String },
  fileType: { type: String },
  title: { type: String },
  createAdId: [{ type: mongoose.Schema.ObjectId, ref: "createAd" }]

})

var Videos = mongoose.model('Videos', VideosSchema)
module.exports = Videos

