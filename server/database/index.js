// Connect to Mongo database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// your local database url
// 27017 is the default mongoDB port
const uri = 'mongodb://BarterOutDev:LuisInnovation1@ds211029.mlab.com:11029/barteroutpreregistrationdatabase';

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
