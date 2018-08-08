var mongoose = require('mongoose')
var schema = mongoose.Schema

var TextSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" }
})

var Text = mongoose.model('Text', TextSchema)
module.exports = Text

