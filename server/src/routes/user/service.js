const client = require('../../db').client;
const usersCollection = client.db().collection('users');

module.exports = {
  allUsers: async () => {
    return await usersCollection.find().toArray();
  },
  create: async () => {
  },
  findUser: async () => {
    return await usersCollection.findOne({ age: 27 });
  },
};
