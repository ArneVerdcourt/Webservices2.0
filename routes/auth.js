const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');

//Register
router.post('/register', async (req, res) => {
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  const salt = await bcrypt.gentSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({user: savedUser._id});
  } catch(err) {
    res.status(400).send(err);
  }
});

//Login
router.post('/login', (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
})

module.exports = router;