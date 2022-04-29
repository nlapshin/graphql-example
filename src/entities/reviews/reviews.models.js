const reviews = [
  {
    animalId: 'c54cbd98-be72-11ec-9d64-0242ac120002',
    rate: 4.5,
    comment: 'I live this dog'
  },
  {
    animalId: 'ca94c520-be72-11ec-9d64-0242ac120002',
    rate: 5,
    comment: 'Good cat'
  }
]

module.exports = {
  listById(animalId) {
    return reviews.filter(review => review.animalId === animalId)
  },
}
