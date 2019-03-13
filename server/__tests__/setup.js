const mongoose = require('mongoose');

// Load models since we will not be instantiating our express server.
require('../models/user');
require('../models/textbook');

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
