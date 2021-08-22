const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// uploadHandler function
const uploadHandler = require('./uploadHandler');

// set storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 80 },
}).single('csv');

// errorHandling
const uploadErrorHandler = (req, res) => {
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

// error handling nélkül
//app.post('/upload', upload, uploadHandler.handlerFunction);

// error handling: https://youtu.be/9Qzmri1WaaE
/*
app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
      console.log(req.file);
      res.send('ok');
    }
  });
});
*/

// multer hibakezelés
app.post('/upload', uploadErrorHandler);

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
});

module.exports = app;
