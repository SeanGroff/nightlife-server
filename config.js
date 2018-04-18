module.exports = {
  database:
    process.env.NODE_ENV === 'production'
      ? `mongodb://${process.env.HOST}/${process.env.NAME}`
      : 'mongodb://localhost:27017/nightlife',
  baseUrl: 'http://localhost:3334/api',
};
