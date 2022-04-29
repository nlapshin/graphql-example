const animalsModel = require("./animals.models");
const reviewsModel = require("../reviews/reviews.models");

module.exports = {
  Query: {
    animals: async () => {
      return animalsModel.list();
    },
    animalsByType: (_, { type }, context) => {
      return animalsModel.filterList({ type });
    }
  },

  Mutation: {
    addAnimal(_, animal) {
      return animalsModel.add(animal)
    },
    addAnimalAsInput(_, { animal }) {
      return animalsModel.add(animal)
    }
  },

  Animal: {
    reviews({ id }) {
      return reviewsModel.listById(id);
    }
  }
};
