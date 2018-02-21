const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://barterout:barterout@ds241658.mlab.com:41658/test_barterout',
  port: process.env.PORT || 8000,
};

export default config;
