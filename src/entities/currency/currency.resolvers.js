module.exports = {
  Query: {
    currencies: async (_, __, context) => {
      const currencies = JSON.parse(await context.currencyAPI.currencies());

      return Object.values(currencies.Valute);
    },
  },
};
