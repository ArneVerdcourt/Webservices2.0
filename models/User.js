const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  }
});

module.exports = mongoose.model('User', UserSchema);