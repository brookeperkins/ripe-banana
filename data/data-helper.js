const fs = require('fs');
const pool = require('../lib/utils/pool');
const { seedActors, seedStudios, seedReviewers, seedFilms } = require('./seed')

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return seedActors();
});

beforeEach(() => {
  return seedStudios();
});

beforeEach(() => {
  return seedReviewers();
});

beforeEach(() => {
  return seedFilms();
});
