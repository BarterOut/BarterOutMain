import app from '../../../server';

const request = require('supertest');

process.env.TEST_SUITE = 'book-testing';

let server;
let agent;

beforeEach((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    agent = request.agent(server);
    // since the application is already listening, it should use the allocated port
    return done();
  });
});

afterEach((done) => {
  return server && server.close(done);
});

it('description', async () => {
  // use agent instead of manually calling `request(app)` each time
  await agent.get('/books');
});
