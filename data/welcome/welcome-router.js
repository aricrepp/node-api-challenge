const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}`,
    fact: process.env.FUN_FACT,
  });
});

module.exports = router;
