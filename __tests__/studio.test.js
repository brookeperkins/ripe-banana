const fs = require('fs');
const pool = require('../lib/utils/pool');
const Studio = require('../lib/models/studio');

describe('Studio class', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('should insert a studio into our database via POST', async() => {
    const studio = await Studio.insert({
      name: 'Warner Bros',
      city: 'Milwaukee',
      state: 'Florida',
      country: 'Belgium'
    });

    const { rows } = await pool.query('SELECT * FROM studios');
    expect(rows[0]).toEqual({ 
      id: expect.any(String),
      name: 'Warner Bros',
      city: 'Milwaukee',
      state: 'Florida',
      country: 'Belgium'
    });

  });
});
