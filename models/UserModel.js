const mongoose = require('mongoose');
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
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('UserModel', userSchema);
