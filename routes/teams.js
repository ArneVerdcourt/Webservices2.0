const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const verify = require('./verifyToken');

//GetAll teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Get team by id
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    res.status(200).json(team);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Post team
router.post('/', verify, async (req, res) => {
  const team = new Team({
    name: req.body.name,
    players: req.body.players
  });
  try {
    const savedTeam = await team.save();
    res.status(200).json(savedTeam);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Delete team
router.delete('/:teamId', verify, async (req,res) => {
  try {
    const team = await Team.remove({_id: req.params.teamId});
    res.status(200).json(team);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

//Update team
router.patch('/:teamId', verify, async (req, res) => {
  try {
    const team = await Team.updateOne({_id: req.params.teamId}, 
      {$set: {
        name: req.body.name,
        players: req.body.players
      }
    });
    res.status(200).json(team);
  } catch(err) {
    res.status(400).json({message: err});
  }
});

module.exports = router;