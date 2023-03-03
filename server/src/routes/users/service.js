const client = require('../../db').client;
const usersCollection = client.db().collection('users');

module.exports = {
  create: async () => {
    await usersCollection.insertOne({ name: 'Vladyslav', age: 27 });
  },
  findUser: async () => {
    return await usersCollection.findOne({ age: 27 });
  },
};
