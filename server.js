const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/dbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log('MongoDB connection has been established successfully')
  )
  .catch(err => {
    console.error(err);
    process.exit();
  });

app.get('/', require('./controllers/upload/routes'))

module.exports = app;
