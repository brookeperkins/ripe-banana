const pool = require('../utils/pool');

module.exports = class Studio {
  id;
  name;
  city;
  state;
  country;

  constructor(studio) {
    this.id = studio.id;
    this.name = studio.name;
    this.city = studio.city;
    this.state = studio.state;
    this.country = studio.country;
  }
  
  static async insert(studio) {
    const { rows } = await pool.query(
      `INSERT INTO studios (name, city, state, country)
    VALUES ($1, $2, $3, $4) RETURNING *`, 
      [studio.name, studio.city, studio.state, studio.country]);

    return new Studio(rows[0]);
  }

};
