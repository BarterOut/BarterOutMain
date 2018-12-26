/**
 * @file index.js
 * @description Entry point for connecting to the DB.
 * @version 0.0.4
 */

// Connect to Mongo database
import config from '../config';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// your local database url
// 27017 is the default mongoDB port

mongoose.connect(config.mongoURL, { useMongoClient: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
  (err) => {
    /** handle initial connection error */
    console.log('Error connecting to Mongo: '); // eslint-disable-line
    console.log(err); // eslint-disable-line
  },
);

module.exports = mongoose.connection;
