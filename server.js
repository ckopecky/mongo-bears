const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/beardb')
  .then(mongo => {
    console.log('connected to database')
  })
  .catch(err => {
    console.log('Error connecting to databse', err)
  });


const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

const bearController = require('./bears/bearController');

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

server.use('/api/bears', bearController);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== API running on http://localhost:${port} ===\n`);
});
