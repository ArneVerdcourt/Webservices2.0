const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

//GetAll teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch(err) {
    res.json({message: err});
  }
});

//Get team by id
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId);
    res.json(team);
  } catch(err) {
    res.json({message: err});
  }
});

//Post team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    players: req.body.players
  });
  try {
    const savedTeam = await team.save();
    res.json(savedTeam);
  } catch(err) {
    res.json({message: err});
  }
});

//Delete team
router.delete('/:teamId', async (req,res) => {
  try {
    const team = await Team.remove({_id: req.params.teamId});
    res.json(team);
  } catch(err) {
    res.json({message: err});
  }
});

//Update team
router.patch('/:teamId', async (req, res) => {
  try {
    const team = await Team.updateOne({_id: req.params.teamId}, 
      {$set: {
        name: req.body.name,
        players: req.body.players
      }
    });
    res.json(team);
  } catch(err) {
    res.json({message: err});
  }
});

module.exports = router;