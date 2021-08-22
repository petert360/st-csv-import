// https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088

const multer = require('multer');

module.exports.handlerFunction = (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  //res.sendStatus(200);
  res.send(file);
};
