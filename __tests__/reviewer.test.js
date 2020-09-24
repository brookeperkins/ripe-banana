const pool = require('../lib/utils/pool');
const Reviewer = require('../lib/models/reviewer');
require('../data/data-helper');

describe('Reviewer class', () => {
  it('should insert a reviewer into our database via POST', async() => {
    const reviewer = await Reviewer.insert({
      name: 'John Reviewer',
      company: 'Review Company',
    });
    console.log(reviewer);

    const { rows } = await pool.query(
      'SELECT * FROM reviewers WHERE id=$1',
      [reviewer.id]
    );
    const mungedRow = new Reviewer(rows[0]);
    expect(mungedRow).toEqual(reviewer);
  });
});
