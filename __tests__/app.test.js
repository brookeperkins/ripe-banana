
const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helper');
const Studio = require('../lib/models/studio');

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

  it('returns all studios via GET', () => {
    return request(app)
      .get('/api/v1/studios')
      .then(res => expect(res.body.length).toEqual(20));
  });

  it('returns a studio by id via GET', async() => {
    const firstStudio = (await Studio.findAll())[0];
    return request(app)
      .get(`/api/v1/studios/${firstStudio.id}`)
      .then(res => expect(res.body).toEqual(firstStudio));
  });
});
