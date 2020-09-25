const pool = require('../utils/pool');

module.exports = class Film {
  id;
  title;
  studio;
  released;
  talent;

  constructor(film) {
    this.id = film.id;
    this.title = film.title;
    this.studio = film.studio;
    this.released = film.released;
    this.talent = film.talent;
  }

  static async insert(film) {
    const { rows } = await pool.query(
      'INSERT INTO films(title, studio, released, talent) VALUES($1, $2, $3, $4) RETURNING *',
      [film.title, film.studio, film.released, JSON.stringify(film.talent)]
    );


    return new Film(rows[0]);
  }
};

// SELECT films.id, title, studios.name AS studio, released, talent FROM films 
//   INNER JOIN studios ON studios.id = films.studio
//   WHERE films.id=$1

// const mungedRow = await Promise.all(rows[0].talent.map(async(character) => {
//   const { rows } = await pool.query('SELECT name FROM actors WHERE id=$1', [character.actor]);
//   return rows[0].name;
// }));
