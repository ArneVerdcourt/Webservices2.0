const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

//GetAll matches
router.get('/', async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(teams);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Get match by id
router.get('/:matchId', async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    res.status(200).json(match);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Post match
router.post('/', async (req, res) => {
  const match = new Match({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    datePlayed: req.body.datePlayed,
    location: req.body.location,
    referees: req.body.referees
  });
  try {
    const savedMatch = await match.save();
    res.status(200).json(savedMatch);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Delete match
router.delete('/:matchId', async (req,res) => {
  try {
    const match = await Match.remove({_id: req.params.matchId});
    res.status(200).json(match);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Update match
router.patch('/:matchId', async (req, res) => {
  try {
    const match = await Match.updateOne({_id: req.params.matchId}, 
      {$set: {
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        datePlayed: req.body.datePlayed,
        location: req.body.location,
        referees: req.body.referees
      }
    });
    res.status(200).json(match);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

module.exports = router;