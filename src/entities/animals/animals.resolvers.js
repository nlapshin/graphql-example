const animalsModel = require("./animals.models");
const reviewsModel = require("../reviews/reviews.models")

module.exports = {
  Query: {
    animals: () => {
      return animalsModel.list();
    },
    animalsByType: (_, args) => {
      return animalsModel.filterList({ type: args.type });
    }
  },
  Animal: {
    reviews({ id }) {
      return reviewsModel.listById(id);
    }
  }
};
