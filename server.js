const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const multerConfig = require('./multerConfig')
const upload = multerConfig.setup();

// multer errorHandling https://youtu.be/9Qzmri1WaaE
const uploadHandler = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(req.file);
    }
  });
};

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

// Router

app.post('/upload', uploadHandler); // multer hibakezeléssel

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
});

module.exports = app;
