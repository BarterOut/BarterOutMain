const config = {
  mongoURL: process.env.MONGO_URL ||
  'mongodb://BarterOut:LuisInnovation1@ds127342.mlab.com:27342/barterout-release',
  port: process.env.PORT || 8080,
};

export default config;
