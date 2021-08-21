const mongoose = require('mongoose');
const Patient = require('./models/patient');

const { createReadStream } = require('fs');
const path = require('path');
const csv = require('fast-csv');

mongoose
  .connect('mongodb://localhost:27017/dbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
/*  .then(() =>
    console.log('MongoDB connection has been established successfully')
  )
  .catch(err => {
    console.error(err);
    process.exit();
  });*/

const readableStream = createReadStream(
  path.resolve(__dirname, 'patients.csv'),
  { encoding: 'utf8' }
);

csv.parseStream(readableStream, { headers: true })
  .on('error', error => console.error(error))
  .on('data', data => console.log(data))
  //.on('data', data => handleData(data))
  .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

const handleData = data => {
  const newPatient = new Patient({
    name: data['name'],
    appointment: data['appointment'],
  });

  newPatient.save((err, item) => {
    if (item) {
      console.log(data);
    }
    if (err) {
      console.error(err);
    }
  });
};
