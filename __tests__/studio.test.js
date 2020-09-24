const pool = require('../lib/utils/pool');
const Studio = require('../lib/models/studio');
require('../data/data-helper');


describe('Studio class', () => {
  it('should insert a studio into our database via POST', async() => {
    const studio = await Studio.insert({
      name: 'Warner Bros',
      city: 'Milwaukee',
      state: 'Florida',
      country: 'Belgium'
    });

    const { rows } = await pool.query('SELECT * FROM studios WHERE id=$1', [studio.id]);
    expect(rows[0]).toEqual({ 
      id: expect.any(String),
      name: 'Warner Bros',
      city: 'Milwaukee',
      state: 'Florida',
      country: 'Belgium'
    });
  });

  it('should find all studios via GET', async() => {
    const allStudios = await Studio.findAll();
    expect(allStudios.length).toEqual(5);
  });

  it('should find a studio by id via GET', async() => {
    const firstStudio = (await Studio.findAll())[0];
    const studio = await Studio.findById(firstStudio.id);
    expect(studio).toEqual(firstStudio);
  });
});
