// Connect to Mongo database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// your local database url
// 27017 is the default mongoDB port
const uri = 'mongodb://BarterOut:LuisInnovation1@ds245150.mlab.com:45150/barterout-development';

mongoose.connect(uri, { useMongoClient: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
  (err) => {
    /** handle initial connection error */
    console.log('error connecting to Mongo: ');
    console.log(err);
  },
);


module.exports = mongoose.connection;
