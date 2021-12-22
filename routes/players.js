const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

//GetAll players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch(err) {
    res.json({message: err});
  }
});

//Get player
router.get('/:playerId', async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    res.json(player);
  } catch(err) {
    res.json({message: err});
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
    res.json(savedPlayer);
  } catch(err) {
    res.json({message: err});
  }
  
});

//Delete player
router.delete('/:playerId', async (req,res) => {
  try {
    const player = await Player.remove({_id: req.params.playerId});
    res.json(player);
  } catch(err) {
    res.json({message: err});
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
    res.json(player);
  } catch(err) {
    res.json({message: err});
  }
})

module.exports = router;