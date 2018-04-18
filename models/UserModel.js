const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: 'Google ID required',
    minLength: 1,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: 'Please supply a name',
    minLength: 1,
    trim: true,
  },
  email: {
    type: String,
    required: 'Please supply a vaid email address',
    minLength: 1,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('UserModel', userSchema);
