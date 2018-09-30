const config = {
  mongoURL: process.env.MONGO_URL ||
  'mongodb://BarterOut:LuisInnovation1@ds245150.mlab.com:45150/barterout-development',
  port: process.env.PORT || 8080,
};

export default config;
