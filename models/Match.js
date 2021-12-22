const mongoose = require('mongoose');
const Team = require('./Team');

const MatchSchema = mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  datePlayed: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    default: "Home Team provides location"
  },  
  referees: {
    type: String,
    default: "Home Team provides referees"
  }
});

module.exports = mongoose.model('Matches', MatchSchema);