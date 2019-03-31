//------------------------------------------------------------------------------------------------
// External Dependencies
//------------------------------------------------------------------------------------------------
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

//------------------------------------------------------------------------------------------------
// User Schema
//------------------------------------------------------------------------------------------------

const Schema   = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  balance: { type: Number, default: 5000.00 }
});

//------------------------------------------------------------------------------------------------
// Password Hashing
//------------------------------------------------------------------------------------------------

userSchema.pre('save', function(next) {
  // 'this' refers to the current user model.
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;

      next();
    });
  });
});

//------------------------------------------------------------------------------------------------
// User Methods
//------------------------------------------------------------------------------------------------
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

//------------------------------------------------------------------------------------------------
// Create User Model
//------------------------------------------------------------------------------------------------
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;