const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
const chance = require('chance').Chance();

const seedStudios = async({ studioCount = 20 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.animal(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country(),
    }));
  await Promise.all(studiosToCreate.map(studio => Studio.insert(studio)));
};

const seedActors = async({ actorCount = 20 } = {}) => {
  const actorsToCreate = [...Array(actorCount)]
    .map(() => ({
      name: chance.animal(),
      dateOfBirth: `${chance.year()}-${chance.integer({ min: 2, max: 2})}-${chance.integer({ min: 2, max: 2})}`,
      placeOfBirth: `${chance.city()}, ${chance.state()}`,
    }));
  await Promise.all(actorsToCreate.map(actor => Actor.insert(actor)));
};

module.exports = { seedStudios, seedActors };

