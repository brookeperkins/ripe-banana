const pool = require('../utils/pool');

module.exports = class Reviewer {
    id;
    name;
    company;

    constructor(reviewer) {
      this.id = reviewer.id;
      this.name = reviewer.name;
      this.company = reviewer.company;
    }

    static async insert(reviewer) {
      console.log(reviewer);
      const { rows } = await pool.query(
        'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
        [reviewer.name, reviewer.company]
      );

      return new Reviewer(rows[0]);
    }
};
