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
      const { rows } = await pool.query(
        'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
        [reviewer.name, reviewer.company]
      );

      return new Reviewer(rows[0]);
    }

    static async findAll() {
      const { rows } = await pool.query('SELECT * FROM reviewers');

      return rows.map(reviewer => new Reviewer(reviewer));
    }
		
    static async findById(id){
      const { rows } = await pool.query(
        'SELECT * FROM reviewers WHERE id=$1', 
        [id]
      );
			
      return new Reviewer(rows[0]);
    }
		
    static async update(id, updatedInfo) {
      const { rows } = await pool.query(`
			UPDATE reviewers 
				SET name=$1,
						company=$2
				WHERE id=$3
				RETURNING *
			`, [updatedInfo.name, updatedInfo.company, id]);

      return new Reviewer(rows[0]);
    }
};
