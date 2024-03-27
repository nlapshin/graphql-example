const DataLoader = require('dataloader');
const { UserDetail } = require('./users.model');

let dataloaderCallCount = 0;

const userDetailsLoader = new DataLoader(async (userIds) => {
  const users = await UserDetail.find({ 'userId': { $in: userIds } });

  // const userMap = users.reduce((map, user) => {
  //   map[user.userId] = user;
  //   return map;
  // }, {});

  console.log('dataloaderCallCount', ++dataloaderCallCount);

  // const res = userIds.map(id => userMap[id]);

  // console.log('res', res);

  return users;
});

module.exports = userDetailsLoader;
