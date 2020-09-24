const pool = require('../utils/pool');

module.exports = class Actor {
  id;
  name;
  dateOfBirth;
  placeOfBirth;

  constructor(actor) {
    this.id = actor.id;
    this.name = actor.name;
    this.dateOfBirth = actor.date_of_birth;
    this.placeOfBirth = actor.place_of_birth;
  }

  static async insert(actor) {
    const { rows } = await pool.query(
      'INSERT INTO actors (name, date_of_birth, place_of_birth) VALUES ($1, $2, $3) RETURNING *',
      [actor.name, actor.dateOfBirth, actor.placeOfBirth]
    );

    return new Actor(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM actors',
    );

    return rows.map(actor => new Actor(actor));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM actors WHERE id=$1',
      [id]
    );

    return new Actor(rows[0]);
  }
};

