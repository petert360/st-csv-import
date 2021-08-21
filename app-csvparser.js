const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Patient = require('./models/patient');

// localhost connection
mongoose.connect('mongodb://localhost:27017/dbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/*  .then(() =>
        console.log('MongoDB connection has been established successfully')
      )
      .catch(err => {
        console.error(err);
        process.exit();
      });*/

// For collectioon

let count = 0;
fs.createReadStream('patients.csv')
  .pipe(csv())
  .on('data', data => {
    const newPatient = new Patient({
      name: data['name'],
      appointment: data['appointment'],
    });

    newPatient.save((err, item) => {
      if (item) {
        count++;
        process.stdout.write(`${count}. `);
      }
      if (err) {
        console.error(err);
      }
    });
  })
  .on('end', () => {
    console.log('Done');
  });
