const pool = require('../../lib/utils/pool');
const Actor = require('../../lib/models/actor');
require('../../data/data-helper');

describe('Actor class', () => {
  it('should insert an actor into the database via POST', async() => {
    const actor = await Actor.insert({
      name: 'Charlie Smith',
      dateOfBirth: '1990-01-09',
      placeOfBirth: 'Los Angeles, California',
    });

    const { rows } = await pool.query(
      'SELECT * FROM actors WHERE id=$1',
      [actor.id]
    );
    const mungedRow = new Actor(rows[0]);
    expect(mungedRow).toEqual(actor);
  });

  it('should find all actors by GET', async() => {
    const allActors = (await Actor.findAll());
    expect(allActors.length).toEqual(5);
  });

  it('should find an actor by ID with GET', async() => {
    const firstActor = (await Actor.findAll())[0];
    const actor = await Actor.findById(firstActor.id);
    expect(actor).toEqual(firstActor);
  })

});
