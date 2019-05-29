import Textbook from '../models/textbook';
import app from '../server';

const mongoose = require('mongoose');
const request = require('supertest');

process.env.TEST_SUITE = 'book-testing';

const dbURL = `mongodb://localhost:27017/${process.env.TEST_SUITE}`;
mongoose.connect(dbURL, { useNewUrlParser: true });

let server;
// let agent;

beforeAll((done) => {
  server = app.listen(4000, (err) => {
    if (err) return done(err);

    // agent = request.agent(server);
    done();
  });
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (let i = 0; i < mongoose.connection.collections.length; i++) {
      mongoose.connection.collections[i].deleteOne(() => {});
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
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`,
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
  } else {
    return clearDB();
  }
  return done();
}, 10000);

afterEach((done) => {
  mongoose.disconnect();
  return done();
});

afterAll(done => server && server.close(done));

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

// describe('setup', () => {
//   const data = {
//     emailAddress: 'fake@u.rochester.edu',
//     password: 'password',
//     CMC: '413',
//     venmoUsername: 'myFakeVenmo',
//     firstName: 'Mr. Fake',
//     lastName: 'McFake',
//     university: 'University of Rochester',
//   };
//   it('Should save temp user', (done) => { // well it passes the test
//     request(app)
//       .post('/auth/signup')
//       .send(data) // x-www-form-urlencoded upload
//       .set('Accept', 'application/json')
//       .expect(201)
//       .end(done);
//   });
// });

// describe('Save Book', () => {
//   it('saves a book', () => {
//     new Textbook({
//       name: 'Book Name',
//       edition: 2,
//       course: 'MTH 101',
//       price: 20,
//       status: 0,
//       condition: 'Good',
//       owner: '12344',
//       date: 111,
//     }).save();
//     expect(2).toEqual(2);
//   });
// });

// describe('Book Model Test', () => {
//   beforeAll(async () => {
//     await Textbook.remove({});
//   });

//   afterEach(async () => {
//     await Textbook.remove({});
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it('has a module', () => {
//     expect(Textbook).toBeDefined();
//   });
// });
