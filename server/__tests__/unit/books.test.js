import Textbook from '../../models/textbook';
import user from '../../models/user';

const mongoose = require('mongoose');

process.env.TEST_SUITE = 'book-testing';

const dbURL = `mongodb://localhost:27017/${process.env.TEST_SUITE}`;
mongoose.connect(dbURL, { useNewUrlParser: true });

describe('Book Model Test', () => {
  beforeAll(async () => {
    await Textbook.remove({});
  });

  afterEach(async () => {
    await user.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('has a module', () => {
    expect(Textbook).toBeDefined();
  });
});
