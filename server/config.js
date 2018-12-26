/**
 * @file config.js.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */

const config = {
  mongoURL: process.env.MONGO_URL ||
  'mongodb://BarterOut:LuisInnovation1@ds127342.mlab.com:27342/barterout-release',
  port: process.env.PORT || 8080,
};

export default config;
