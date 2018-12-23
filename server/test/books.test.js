import app from '../app';

const request = require('supertest');

describe('demo test', () => {
  afterAll((done) => {
    app.close(done);
  });

  it('returns 200', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
  });
});
