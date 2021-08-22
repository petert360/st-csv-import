const express = require('express');
const service = require('./service');

const path = require('path');
const csv = require('fast-csv');
const { createReadStream } = require('fs');

exports.parse = (req, res, next) => {
  const readableStream = createReadStream(
    path.resolve(__dirname, '..', '..', 'patients.csv'),
    { encoding: 'utf8' }
  );

  csv
    .parseStream(readableStream, { headers: true })
    .on('error', error => console.error(error))
    .on('data', data =>
      service
        .parse(data)
        .then(result => {
          //res.status(201);
          // res.json(result);
          console.log(result);
        })
        .catch(err => console.error(err))
    )
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
};

exports.upload = (req, res, next) => {
  return res.status(201);
  res.send('done');
};
