const RestApi = require('./src/rest-api').RestApi;

module.exports = {
  devServer: {
    before: app => new RestApi(app),
  }
}
