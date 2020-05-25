// конфигурация базы данных
module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/authorization',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
