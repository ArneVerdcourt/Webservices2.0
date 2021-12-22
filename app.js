const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');

//Middlewares
app.use(bodyParser.json());

//Import Routes
const playersRoute = require('./routes/players');
const teamsRoute = require('./routes/teams');
const matchesRoute = require('./routes/matches');

app.use('/players', playersRoute);
app.use('/teams', teamsRoute);
app.use('/matches', matchesRoute);

app.get('/', (req, res) => {
  res.send('We are on HOME!!');
})

//DB Connection
mongoose.connect(process.env.DB_CONNECTIONSTRING, 
  {useNewUrlParser: true}, () =>
    console.log('Connected to DB!')
);

//Listen to server
app.listen(3000);