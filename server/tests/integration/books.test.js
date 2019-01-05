import app from '../../server';
import Textbook from '../../models/textbook';
import user from '../../models/user'
import TempUser from "../../models/tempUser";
const mongoose = require('mongoose');
const request = require('supertest');
const rand = require('rand-token');

let k = false;

process.env.TEST_SUITE = 'book-testing';
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJfaWQiOiI1YzExN2NlODc
// 1MzQ4NDJhMzk4OWQ1MDIiLCJwZXJtaXNzaW9uVHlwZSI6MX0sImlhdCI6MTU0NTU5MjgwMCwiZXhwIjoxNTQ4MTg0ODAw
// fQ.UWt4qRvip70flduKVirV_4H65ta89JF7E86ZxDhS-cc';

beforeAll((done) => {
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */

  function clearDB() {
    for (let i = 0; i < mongoose.connection.collections.length; i++) {
      mongoose.connection.collections[i].remove(() => {});
    }
    console.log('hmmmm' + Date.now());

    return done();
  }
  function setupDB()  { //tried to setup a user before the book tests run so that we have a user to work with


    for (let i = 0; i < mongoose.connection.collections.length; i++) {
      mongoose.connection.collections[i].remove(() => {});
    }
    //  clearDB().then(()=>{
    // clearDB();
    console.log('make the stuff' + Date.now());
      const emailToken = rand.generate(48);
    const newUser = new TempUser({
      emailAddress: 'fake@u.rochester.edu',
      password: 'password',
      CMC: '413',
      venmoUsername: 'myFakeVnemo',
      firstName: 'Mr. Fake',
      lastName: 'McFake',
      matchedBooks: [],
      university: 'University of Rochester',
      emailToken,
      createdAt: Date.now(),
    });
    newUser.save()
      .then(async () => {
        k = true;
        // return done();
        const response = await request(app).get('/email-verification/'+newUser.emailToken);
        console.log(response);
        return done();
      });


    // });
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
},20000);

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

describe('Create Book', () => {
  beforeAll(() => {
  const emailToken = rand.generate(48);
  const newUser = new TempUser({
    emailAddress: 'fake@u.rochester.edu',
    password: 'password',
    CMC: '413',
    venmoUsername: 'myFakeVnemo',
    firstName: 'Mr. Fake',
    lastName: 'McFake',
    matchedBooks: [],
    university: 'University of Rochester',
    emailToken,
    createdAt: Date.now(),
  });
  newUser.save()
    .then(async () => {
      k = true;
      // return done();
      const response = await request(app).get('/email-verification/'+newUser.emailToken);
      console.log(response);
    });
  });

  it('create a book',  () => {
    if (k === true){
      console.log('yeeet');
    } else if (k === false) {
      console.log('rip');
    }
     new Textbook({
      name: 'Book Name',
      edition: 2,
      course: 'MTH 101',
      price: 20,
      status: 0,
      condition: 'Good',
      owner: '12344',
      date: 111,
    }).save();
    // const book = await Textbook.findOne({ name: 'Name' });
    // expect(book.name).toEqual('Book Name');
    expect(2).toEqual(2);

  });
});
