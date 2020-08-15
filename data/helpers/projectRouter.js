const express = require('express');
const actions = require('./actionModel');
const projects = require('./projectModel');
const router = express.Router();

router.get('/', (req, res) => {
  projects
    .get()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', validateUser(), (req, res) => {
  projects
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

router.put('/:id', validateUserId(), (req, res) => {
  projects
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
  projects
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

router.get('/:id/actions', validateUserId(), (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then((project) => {
      res.status(201).json(project);
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
    } else if (!req.body.name || !req.body.description) {
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
    projects
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
