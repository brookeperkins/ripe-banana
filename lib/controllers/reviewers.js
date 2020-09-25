const { Router } = require('express');
const Reviewer = require('../models/reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer.insert(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Reviewer.findAll()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })
  
  .get('/:id', (req, res, next) => {
    Reviewer.findById(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Reviewer.update(req.params.id, req.body)
      .then(updatedReviewer => res.send(updatedReviewer))
      .catch(next);
  });

