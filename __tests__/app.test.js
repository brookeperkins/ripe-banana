
const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helper');

describe('ripe-banana routes', () => {

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
