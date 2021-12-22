const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  givenName: {
    type: String,
    required: true
  },
  playerNumber: {
    type: Number,
    required: true
  },
  goals: {
    type: Number,
    default: 0
  },
  assists: {
    type: Number,
    default: 0
  },
  matchesPlayed: {
    type: Number,
    default: 0
  },
  position: {
    type: String
  }
});

module.exports = mongoose.model('Players', PlayerSchema);