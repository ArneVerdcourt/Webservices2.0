const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const playersRoute = require('./routes/players');
const teamsRoute = require('./routes/teams');
const matchesRoute = require('./routes/matches');
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/players', playersRoute);
app.use('/teams', teamsRoute);
app.use('/matches', matchesRoute);
app.use('/user', authRoute);

app.get('/', (req, res) => {
  res.send('We are on HOME!!');
})

//DB Connection
mongoose.connect(process.env.DB_CONNECTIONSTRING, 
  {useNewUrlParser: true}, 
  () => console.log('Connected to DB!')
);

//Listen to server
app.listen(3000, () => console.log('API Running'));