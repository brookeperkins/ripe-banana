
const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helper');
const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');

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
      .then(res => expect(res.body.length).toEqual(5));
  });

  it('returns a studio by id via GET', async() => {
    const firstStudio = (await Studio.findAll())[0];
    return request(app)
      .get(`/api/v1/studios/${firstStudio.id}`)
      .then(res => expect(res.body).toEqual(firstStudio));
  });

  it('inserts actor into database via POST', () => {
    const firstActor = {   
      name: 'Charlie Smith',
      dateOfBirth: '1990-01-09',
      placeOfBirth: 'Los Angeles, California' };
    return request(app)
      .post('/api/v1/actors')
      .send(firstActor)
      .then(res => expect(res.body).toEqual({
        name: 'Charlie Smith',
        dateOfBirth: expect.any(String),
        placeOfBirth: 'Los Angeles, California',
        id: expect.any(String)
      }));
  });

  it('returns all actors via GET', () => {
    return request(app)
      .get('/api/v1/actors')
      .then(res => expect(res.body.length).toEqual(5));
  });

  it('returns an actor by id via GET', async() => {
    const firstActor = (await Actor.findAll())[0];
    return request(app)
      .get(`/api/v1/actors/${firstActor.id}`)
      .then(res => expect(res.body).toEqual({ ...firstActor, dateOfBirth: firstActor.dateOfBirth.toISOString() }));
  });

  it('should insert a reviewer via POST', async() => {
    const insertReviewer = {
      name: 'jimmy Don',
      company: 'jimmy Don MegaDon'
    };

    return request(app)
      .post('/api/v1/reviewers')
      .send(insertReviewer)
      .then(res => expect(res.body).toEqual({ ...insertReviewer, id: expect.any(String) }));
  });

  it('should find all reviewers via GET', async() => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => expect(res.body.length).toEqual(5));
  });

  it('should find a reviewer when given an id via GET', async() => {
    const firstReviewer = (await Reviewer.findAll())[0];
    console.log(firstReviewer, 'first reviewer');
    return request(app)
      .get(`/api/v1/reviewers/${firstReviewer.id}`)
      .then(res => expect(res.body).toEqual(firstReviewer));
  });

  it('should update a reiviewer by id via PUT', async() => {
    const firstReviewer = (await Reviewer.findAll())[0];
    const updatedInfo = { name: 'benjamin', company: 'Bobs Refrigeration' };
    return request(app)
      .put(`/api/v1/reviewers/${firstReviewer.id}`)
      .send(updatedInfo)
      .then(res => expect(res.body).toEqual({ ...updatedInfo, id: firstReviewer.id }));
  });

  it('should insert a film via POST', async() => {
    const insertedFilm = ({
      title: 'Mr and Mrs Smith',
      studio: 1,
      released: 2008,
      talent: [{
        role: 'main character',
        actor: 1
      }]
    });

    return request(app)
      .post('/api/v1/films/')
      .send(insertedFilm)
      .then(res => expect(res.body).toEqual({ ...insertedFilm, id: expect.any(String) }));
  });


});
