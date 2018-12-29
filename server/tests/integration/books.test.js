import app from '../../server';
// import Textbook from '../../models/textbook';

const mongoose = require('mongoose');
const request = require('supertest');

process.env.TEST_SUITE = 'book-testing';
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJfaWQiOiI1YzExN2NlODc
// 1MzQ4NDJhMzk4OWQ1MDIiLCJwZXJtaXNzaW9uVHlwZSI6MX0sImlhdCI6MTU0NTU5MjgwMCwiZXhwIjoxNTQ4MTg0ODAw
// fQ.UWt4qRvip70flduKVirV_4H65ta89JF7E86ZxDhS-cc';

beforeEach((done) => {
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (let i = 0; i < mongoose.connection.collections.length; i++) {
      mongoose.connection.collections[i].remove(() => {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`, // <------- IMPORTANT
      (err) => {
        if (err) {
          throw err;
        }
        return clearDB();
      },
    );
  } else {
    return clearDB();
  }
  return done();
});

afterEach((done) => {
  mongoose.disconnect();
  return done();
});

afterAll(done => done());

// TESTS
describe('Route Ensure', () => {
  afterAll((done) => {
    app.close(done);
  });

  it('returns 200', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
  });
});

// describe('Create Book', () => {
//   it('create a book', async () => {
//     await new Textbook({
//       name: 'Book Name',
//       edition: 2,
//       course: 'MTH 101',
//       price: 20,
//       status: 0,
//       condition: 'Good',
//       owner: '12344',
//       date: 111,
//     }).save();
//     const book = await Textbook.findOne({ name: 'Sol' });
//     expect(book.name).toEqual('Book Name');
//   });
// });
