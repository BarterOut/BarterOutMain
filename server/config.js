/**
 * @file config.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */

const config = {
  mongoURL: process.env.MONGO_URL
  || 'mongodb://BarterOutDev:LuisInnovation1@ds245150.mlab.com:45150/barterout-development',
  port: process.env.PORT || 8080,
};

export default config;
