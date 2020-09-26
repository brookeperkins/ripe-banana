const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');
const Film = require('../lib/models/film');
const chance = require('chance').Chance();

const seedStudios = async({ studioCount = 5 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.animal(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country(),
    }));
  await Promise.all(studiosToCreate.map(studio => Studio.insert(studio)));
};

const seedActors = async({ actorCount = 5 } = {}) => {
  const actorsToCreate = [...Array(actorCount)]
    .map(() => ({
      name: chance.animal(),
      dateOfBirth: `${chance.year()}-${chance.integer({ min: 2, max: 2 })}-${chance.integer({ min: 2, max: 2 })}`,
      placeOfBirth: `${chance.city()}, ${chance.state()}`,
    }));
  await Promise.all(actorsToCreate.map(actor => Actor.insert(actor)));
};

const seedReviewers = async({ reviewerCount = 5 } = {}) => {
  const reviewersToCreate = [...Array(reviewerCount)]
    .map(() => ({
      name: chance.animal(),
      company: chance.animal(),
    }));
  await Promise.all(reviewersToCreate.map(reviewer => Reviewer.insert(reviewer)));
};

const seedFilms = async({ filmCount = 5 } = {}) => {
  const filmsToCreate = [...Array(filmCount)]
    .map(() => ({
      title: chance.animal(),
      studio: chance.integer({ min: 1, max: 5 }),
      released: chance.year(),
      talent: [{ 
        role: chance.character(), 
        actor: chance.integer({ min: 1, max: 5 }) 
      }, 
      {
        role: chance.character(),
        actor: chance.integer({ min: 1, max: 5 })
      }],
    }));
  await Promise.all(filmsToCreate.map(film => Film.insert(film)));
};

module.exports = { seedStudios, seedActors, seedReviewers, seedFilms };
