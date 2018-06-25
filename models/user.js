const mongoose = require('mongoose')
// const bcrypt = require('bcrypt-nodejs')
// const SALT_FACTOR = 10
const Schema = mongoose.Schema

const UserSchema = Schema({
  firstName: { type: String, max: 50 },
  lastName: { type: String, max: 50 },
  username: { type: String, max: 50 },
  city: { type: String, max: 50 },
  state: { type: String, max: 50 },
  zipcode: { type: String, max: 50 },
  email: { type: String, unique: true },
  password: { type: String, min: 6, max: 50 },
  role: { type: String },
  token: { type: String },
  photoId: { type: mongoose.Schema.ObjectId, ref: 'Photo' }
})

UserSchema
  .virtual('name')
  .get(function () {
    if (this.firstName && this.lastName)
      return this.firstName + ' ' + this.lastName

    return this.username
  });

UserSchema.methods.full_name = function () {
  return this.first_name + ' ' + this.last_name
}

const User = mongoose.model('User', UserSchema)
module.exports = User

