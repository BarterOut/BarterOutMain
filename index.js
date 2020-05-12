// App entry point
require('dotenv').config();
require('@babel/register');

require('@babel/polyfill');
require('./server/server');
