import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import cuid from 'cuid';

import { connectDB } from '../util/testHelpers';
import Kitten from '../server/models/kitten';
import app from '../server/server';


chai.use(chaiHttp);
const should = chai.should();

beforeEach('Connect to DB', (done) => {
  connectDB(done);
});

afterEach('Drop the test database', (done) => {
  mongoose.connection.dropDatabase((err) => {
    if (!err) done();
  });
});

const kittens = [
  new Kitten({ name: 'Jimmy', cuid: cuid() }),
  new Kitten({ name: 'Hendrix', cuid: cuid() }),
];

describe('Add some kittens', () => {
  it('it should add some kittens', (done, fail) => {
    Kitten.create((kittens, err) => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
});

describe('/GET mern', () => {
  it('it should GET /mern successfully', (done) => {
    chai.request(app)
      .get('/mern')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
