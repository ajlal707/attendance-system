var mongoose = require('mongoose')
var schema = mongoose.Schema

var TextSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createAdId: [{ type: mongoose.Schema.ObjectId, ref: "createAd" }]

})

var Text = mongoose.model('Text', TextSchema)
module.exports = Text

