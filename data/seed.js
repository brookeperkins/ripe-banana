const Studio = require('../lib/models/studio');
const chance = require('chance').Chance();

module.exports = async({ studioCount = 20 } = {}) => {
  const studiosToCreate = [...Array(studioCount)]
    .map(() => ({
      name: chance.animal(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country(),
    }));
  await Promise.all(studiosToCreate.map(studio => Studio.insert(studio)));

};

