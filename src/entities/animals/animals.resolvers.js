const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const ADD_ANIMAL_EVENT = 'ADD_ANIMAL'

const animalsModel = require("./animals.models");
const reviewsModel = require("../reviews/reviews.models");

function addAnimal(animal) {
  const newAnimal = animalsModel.add(animal)

  pubsub.publish(ADD_ANIMAL_EVENT, {
    animalAdded: newAnimal
  });

  return newAnimal
}

module.exports = {
  Query: {
    animals: async () => {
      console.log('request')

      return animalsModel.list();
    },
    animalsByType: (_, { type }, context) => {
      return animalsModel.filterList({ type });
    }
  },

  Mutation: {
    addAnimal(_, animal) {
      return addAnimal(animal)
    },
    addAnimalAsInput(_, { animal }) {
      return addAnimal(animal)
    }
  },

  Subscription: {
    animalAdded: {
      subscribe: () => {
        return pubsub.asyncIterator([ADD_ANIMAL_EVENT])
      },
    },
  },

  Animal: {
    reviews({ id }) {
      return reviewsModel.listById(id);
    }
  }
};
