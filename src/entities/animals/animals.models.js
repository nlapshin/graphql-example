const uuid = require('uuid');

const animals = [
  {
    id: 'c54cbd98-be72-11ec-9d64-0242ac120002',
    name: "barsik",
    type: "cat",
    age: 5,
    legs: 4,
    catBreed: 'British Shorthair'
  },
  {
    id: 'ca94c520-be72-11ec-9d64-0242ac120002',
    name: "sharik",
    type: "dog",
    age: 3,
    legs: 4,
    dogBreed: 'American Hairless Terrier',
  },
];

module.exports = {
  list() {
    return animals
  },

  filterList(filters = {}) {
    return this.list().filter(item => {
      if (filters.type && filters.type !== item.type) {
        return false
      }

      return true
    })
  },

  add(animal) {
    const item = {
      ...animal,
      id: uuid.v4(),
      reviews: []
    }
  
    animals.push(item)

    return item
  }
}
