const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', (req, res, next) => {
  return controller.parse(req, res, next);
});

module.exports = router;
