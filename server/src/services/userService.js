const UserModel = require('../models/userModel');

module.exports = {
  allUsers: async () => {
    return await UserModel.find();
  },
  create: async () => {},
  findUser: async () => {
    return await usersCollection.findOne({ age: 27 });
  },
};
