const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

//GetAll players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json(players);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Get player by id
router.get('/:playerId', async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    res.status(200).json(player);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Post player
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    givenName: req.body.givenName,
    playerNumber: req.body.playerNumber,
    goals: req.body.goals,
    assists: req.body.assists,
    matchesPlayed: req.body.matchesPlayed,
    position: req.body.position
  });
  try {
    const savedPlayer = await player.save();
    res.status(200).json(savedPlayer);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Delete player
router.delete('/:playerId', async (req,res) => {
  try {
    const player = await Player.remove({_id: req.params.playerId});
    res.status(200).json(player);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Update player
router.patch('/:playerId', async (req, res) => {
  try {
    const player = await Player.updateOne({_id: req.params.playerId}, 
      {$set: {
        name: req.body.name,
        givenName: req.body.givenName,
        playerNumber: req.body.playerNumber,
        goals: req.body.goals,
        assists: req.body.assists,
        matchesPlayed: req.body.matchesPlayed,
        position: req.body.position
      }
    });
    res.status(200).json(player);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

module.exports = router;