const { Router } = require('express');
const Studio = require('../models/studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio.insert(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Studio.findAll()
      .then(studios => res.send(studios))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Studio.findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  });
