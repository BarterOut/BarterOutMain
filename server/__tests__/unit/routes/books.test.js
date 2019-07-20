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

describe('GET /books ', () => {
  test('/', async () => {
    const response = await request(app).get('/api/books/');
    expect(response.statusCode).toBe(200);
  });
  test('/getBooksNoToken', async () => {
    const response = await request(app).get('/api/books/getBooksNoToken');
    expect(response.statusCode).toBe(200);
  });
  test('/search', async () => {
    const response = await request(app).get('/api/books/search');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST /books ', () => {
  test('/requestBook', async () => {
    const response = await request(app).post('/api/books/requestBook');
    expect(response.statusCode).toBe(500);
  });
});
