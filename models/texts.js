var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TextSchema = mongoose.Schema({
  title: { type: String},
  description: { type: String },
  createAdId: [{ type: mongoose.Schema.ObjectId, ref: "createAd" }]

})

var Text = mongoose.model('Text', TextSchema)
module.exports = Text

