const animalsModel = require("./animals.models");

module.exports = {
  Query: {
    animals: () => {
      return animalsModel.list();
    },
    animalsByType: (_, args) => {
      return animalsModel.filterList({ type: args.type });
    }
  }
};
