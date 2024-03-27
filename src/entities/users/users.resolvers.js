const { User, UserDetail } = require('./users.model');

let resolverCallCount = 0;

module.exports = {
  Query: {
    users: async () => {
      return await User.find();
    }
  },

  User: {
    async detail({ id }, _, { userDetailsLoader }) {
      // console.log(id);
      // console.log(userDetailsLoader);

      console.log('resolverCallCount', ++resolverCallCount);

      return await userDetailsLoader.load(id);

      // return await UserDetail.findOne({ userId: id });
    }
  }
};
