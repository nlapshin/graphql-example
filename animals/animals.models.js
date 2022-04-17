const animals = [
  {
    id: 'c54cbd98-be72-11ec-9d64-0242ac120002',
    name: "barsik",
    type: "cat",
    age: 5,
    legs: 4,
    catBreed: 'British Shorthair',
    reviews: [
      {
        rate: 5,
        comment: 'Good cat'
      }
    ]
  },
  {
    id: 'ca94c520-be72-11ec-9d64-0242ac120002',
    name: "sharik",
    type: "dog",
    age: 3,
    legs: 4,
    dogBreed: 'American Hairless Terrier',
    reviews: [
      {
        rate: 4.5,
        comment: 'I live this dog'
      }
    ]
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
  }
}
