const mongoose = require('mongoose');
const Player = require('./Player');

const TeamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  players: {
    type: []
  }
});

module.exports = mongoose.model('Teams', TeamSchema);