const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: `Welcome to Node Sprint Challenge 1!!`,
  });
});

module.exports = router;
