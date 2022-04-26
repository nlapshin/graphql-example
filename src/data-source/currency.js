const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class CurrencyAPI extends RESTDataSource {

  constructor() {
    super();

    this.baseURL = 'https://www.cbr-xml-daily.ru/';
  }


  async currencies() {
    return this.get(`daily_json.js`);

  }
}
