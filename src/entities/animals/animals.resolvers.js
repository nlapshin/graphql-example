const { UserInputError } = require('apollo-server-core')
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

// parent, args, context, info
/*
parent - ссылка модель вышел
*/

module.exports = {
  Query: {
    animals: async (parent, args, context) => {
      console.log('request animals')
      console.log('context', context)

      if (context.user.role !== 'admin') {
        throw Error('test')
      }

      return animalsModel.list();
    },
    animalsByType: (_, { type }, context) => {
      return animalsModel.filterList({ type });
    }
  },
  /*
  parent {
    id: 'ca94c520-be72-11ec-9d64-0242ac120002',
    name: 'sharik',
    type: 'dog',
    age: 3,
    legs: 4,
    dogBreed: 'American Hairless Terrier'
  }*/

  Animal: {
    // По требованию, когда в запросе 
    // есть поле
    // context глобальный объект сервера
    // context - это ссылки на глобальные объекты,
    // например db
    // или полученные во время выполнения запроса данные.
    // context.user, метаинформация и т.д.
    reviews(parent) {
      return reviewsModel.listById(parent.id);
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
  }
};

/*
const result = [
  {
    id: 1,
    name: 'barsic'
  },
  {
    id: 2,
    name: 'sharic'
  }
]

const animalsIds = [1, 2]
const reviewList = reviewsModel.listById(animalsIds);
*/

// N + 1 проблема
// DataLoader
// 1. Batching данных - получение их не по одному а куском.
// 2. Cashing данных - забирать данные один раз на запрос и отдавать их из кэша.


/*
collection animals - все животные. id - id животного
collection reviews - все ревью. animalId - внешний ключ животного


const animals = [
  {
    id: 1,
    name: 'barsic'
  },
  {
    id: 2,
    name: 'sharic'
  }
]

const reviews = [
  {
    id: 1,
    animalId: 1,
    comment: 'review-1'
  },
  {
    id: 2,
    animalId: 2,
    comment: 'review-2'
  }
]

// 100 животных + 1000 ревью.
// из 1000 ревью нужно 5 ревью.


for (let animal of animals) {
  animal.reviews = reviews.filter(rev => rev.animalId === animal.id)
}
*/
/*
[
  {
    id: 1,
    name: 'barsic',
    reviews: [
      {
        comment: 'tset'
      }
    ]
  },
  {
    id: 2,
    name: 'sharik',
    reviews: [
      {
        comment: 'tset'
      }
    ]
  }
]*/

// function mathOperation(a1, a2, operator) {
//   if (operator === '+') {
//     return a1 + a2
//   } else if (operator === '-') {
//     return a1 - a2;
//   }
// }

// function sum()
// function sub()

/*
const GET_POSTS = gql`
  query GetPosts($limit: Int) {
    posts(limit: $limit) {
      id
      body
      title
      createdAt
    }
  }
`;


client
  .query({
    query: GET_POSTS,
    variables: { limit: 5 },
  })
  .then((response) => console.log(response.data))
  .catch((err) => console.error(err));
*/
