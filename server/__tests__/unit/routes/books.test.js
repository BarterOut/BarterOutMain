require('dotenv').config();

import app from '../../../app';

const request = require('supertest');

// since these are unit tests, we are just ensuring that
// routes are up and have good responses

// integration tests will test if everything is working with the DB smoothly
// these are harder to write so for now I am just focusing on getting all
// the tests for the routes done, and then moving on to that

// we also need to think about seperating our tests out into suites
// so that we can run each on individually

let server;
beforeAll(done => {
  jest.useFakeTimers();
  server = app.listen(5000, () => {
    done();
  });
});

afterAll(done => {
  server.close(done);
});

describe('GET /books ', () => {
  test('/', (done) => {
    request(app)
      .get('/api/books/')
      .expect(200)
      .end(done)
  });
  test('/getBooksNoToken', (done) => {
    request(app)
      .get('/api/books/getBooksNoToken')
      .expect(200)
      .end(done)
  });
  test('/search', (done) => {
    request(app)
      .get('/api/books/search')
      .expect(200)
      .end(done)
  });
});

describe('POST /books ', () => {
  test('/requestBook should fail with no auth', (done) => {
    request(app)
      .post('/api/books/requestBook')
      .expect(401)
      .end(done)
  });
});
