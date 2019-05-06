const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const UserSchema = Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String, min: 6, max: 50 },
  role: { type: String },
  token: { type: String },
  status: { type: String },
  createdAt: { type: String },
  photoId: { type: mongoose.Schema.ObjectId, ref: 'Photo' },
  attendanceId: { type: mongoose.Schema.ObjectId, ref: 'Attendance' },
})

UserSchema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePasswords = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  })
})


const User = mongoose.model('User', UserSchema)
module.exports = User

