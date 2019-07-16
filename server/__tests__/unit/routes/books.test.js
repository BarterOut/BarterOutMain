import app from '../../../server';

const request = require('supertest');

process.env.TEST_SUITE = 'book-testing';

let server;

beforeEach((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    const agent = request.agent(server);
    console.log(agent); // eslint-disable-line
    // since the application is already listening, it should use the allocated port
    return done();
  });
});

afterEach(done => server && server.close(done));

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
