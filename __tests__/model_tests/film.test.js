const pool = require('../../lib/utils/pool');
const Film = require('../../lib/models/film');
require('../../data/data-helper');

describe('Film class', () => {
  it('inserts a film into our database via POST', async() => {
    const insertedFilm = await Film.insert({
      title: 'Mr and Mrs Smith',
      studio: 1,
      released: '2008',
      talent: [{
        role: 'main character',
        actor: 1
      }]
    });
    const { rows } = await pool.query('SELECT * FROM films WHERE id=$1', [insertedFilm.id]);
    
    expect(rows[0]).toEqual({ ...insertedFilm, id: expect.any(String) });
  });

  it('should find all films via GET', async() => {
    const insertedFilm = await Film.insert({
      title: 'Mr and Mrs Smith',
      studio: 1,
      released: '2008',
      talent: [{
        role: 'main character',
        actor: 1
      }]
    });
    const foundFilm = await Film.findById(insertedFilm.id);
    expect(foundFilm).toEqual({
      id: expect.any(String),
      title: 'Mr and Mrs Smith',
      studio: expect.any(String),
      released: 2008,
      talent: [{
        role: 'main character',
        actor: expect.any(String)
      }]
    });
  });

  it('should find all the films via GET', async() => {
    const foundFilms = await Film.findAll();
    expect(foundFilms.length).toEqual(5);
  });
});
