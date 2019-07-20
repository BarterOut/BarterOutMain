/**
 * @file config.js
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Daniel Munoz
 * @author Shawn Chan
 * @author Luis Nova
 * @version 0.0.4
 */

const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/barterout-db',
  port: process.env.PORT || 8080,
  key: process.env.JWT_SECRET,
  statuses: [0, 1, 2, 3, 4],
};

export default config;
