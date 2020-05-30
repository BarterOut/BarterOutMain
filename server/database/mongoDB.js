/**
 * @file index.js
 * @description Database connection wrapper class.
 * @author Duncan Grubbs
 */

import mongoose from 'mongoose';
import config from '../config';

module.exports = {
  mongoose,
  connect: () => {
    mongoose.set('debug', process.env.NODE_ENV !== 'production');
    mongoose.Promise = Promise;
    mongoose.connect(
      config.mongoURL,
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
    );
    mongoose.connection
      .on('error', (error) => {
        console.warn('Error: ', error); // eslint-disable-line
      });
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
};
