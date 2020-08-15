const express = require('express');
const actions = require('./actionModel');
const router = express.Router();

router.get('/', (req, res) => {
  actions
    .get()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', validateUser(), (req, res) => {
  actions
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.put('/:id', validateUserId(), (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(req.body);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Could not update user',
      });
    });
});

router.delete('/:id', validateUserId(), (req, res) => {
  actions
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: 'Deleted 1 record',
        });
      } else {
        res.status(404).json({
          message: 'The user could not be found',
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: 'Missing user data',
      });
    } else if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes
    ) {
      return res.status(400).json({
        message: 'Missing required name field',
      });
    }
    next();
  };
}

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    actions
      .get(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: 'Invalid user ID',
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

module.exports = router;
