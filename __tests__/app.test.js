const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('ripe-banana routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('returns a new studio via POST', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({ 
        name: 'Warner Bros',
        city: 'Milwaukee',
        state: 'Florida',
        country: 'Belgium'
      })
      .then(res => expect(res.body)
        .toEqual({
          id: expect.any(String),
          name: 'Warner Bros',
          city: 'Milwaukee',
          state: 'Florida',
          country: 'Belgium'
        }));
  });
});
