const pool = require('../lib/utils/pool');
const Reviewer = require('../lib/models/reviewer');
require('../data/data-helper');

describe('Reviewer class', () => {
  it('should insert a reviewer into our database via POST', async() => {
    const reviewer = await Reviewer.insert({
      name: 'John Reviewer',
      company: 'Review Company',
    });

    const { rows } = await pool.query(
      'SELECT * FROM reviewers WHERE id=$1',
      [reviewer.id]
    );
    const mungedRow = new Reviewer(rows[0]);
    expect(mungedRow).toEqual(reviewer);
  });

  it('should find all reviewer from our database via GET', async() => {
    const allReviewers = await Reviewer.findAll();
    expect(allReviewers.length).toEqual(5);
  });

  it('finds a reviewer by id via GET', async() => {
    const firstReviewer = (await Reviewer.findAll())[0];
    const findReviewer = await Reviewer.findById(firstReviewer.id);
    expect(findReviewer).toEqual(firstReviewer);
  });

  it('updates a reviewer via PUT', async() => {
    const firstReviewer = (await Reviewer.findAll())[0];
    const updatedInfo = { name: 'benjamin', company: 'Bobs Refrigeration' };
    const updatedReviewer = await Reviewer.update(firstReviewer.id, updatedInfo);
    expect(updatedReviewer).toEqual({ ...updatedInfo, id: firstReviewer.id });
  });
});
