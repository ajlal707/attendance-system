const mongoose = require('mongoose')
const Schema = mongoose.Schema

const createAdSchema = Schema({
  duration: { type: String },
  templateId: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  imageId: { type: mongoose.Schema.ObjectId, ref: 'Attachments' },
  textsId: { type: mongoose.Schema.ObjectId, ref: 'Text' },
  videosId: { type: mongoose.Schema.ObjectId, ref: 'Videos' },


})


const createAd = mongoose.model('createAd', createAdSchema)
module.exports = createAd

