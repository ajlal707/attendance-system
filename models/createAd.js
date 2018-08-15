const mongoose = require('mongoose')
const Schema = mongoose.Schema

const createAdSchema = Schema({
  userId: { type: String },
  username: { type: String },
  imageId: { type: String },
  imagePath: { type: String },
  videoId: { type: String },
  textId: { type: String },
  textTitle: { type: String },
  textdescription: { type: String },
  duration: { type: String },
  templateId: { type: String },
  photoId: { type: mongoose.Schema.ObjectId, ref: 'UserId' }
})



const createAd = mongoose.model('createAd', createAdSchema)
module.exports = createAd

