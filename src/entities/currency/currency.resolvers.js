module.exports = {
  Query: {
    currencies: async (_, __, { dataSources }) => {
      const currencies = JSON.parse(await dataSources.currencyAPI.currencies());

      return Object.values(currencies.Valute);
    },
  },
};
