const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);
  res.send(error);
  if (error) return res.status(400).send('Problem registering');

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({user: savedUser._id});
  } catch(err) {
    res.status(400).send(err);
  }
});

//Login
router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send('login not successful');

  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email or password does not exist');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Email or password does not exist');

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;