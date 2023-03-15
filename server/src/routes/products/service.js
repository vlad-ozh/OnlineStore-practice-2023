const db = require('../../db').client.db();

module.exports = {
  allProducts: async () => {
    const allCollections = await db.collections();

    return Promise.all(allCollections.map(async (currentCollection) => {
      const collectionName = currentCollection.collectionName;
      if (collectionName !== 'users'){
        const collectionValue = currentCollection.find().toArray();

        return {
          name: collectionName,
          value: await collectionValue,
        };
      }

      return undefined;
    })).then(res => {
      let collectionsValues = {};

      res.forEach(collection => {
        if (collection !== undefined) {
          collectionsValues = {
            ...collectionsValues,
            [collection.name]: collection.value,
          };
        }
      });

      return collectionsValues;
    });
  },
  // create: async () => {
  // POST
  // const filter = { apple: [] };

  // const updateDocument = {
  //   $push: {
  //     'apple': {
  //       user4: 'qwe4',
  //       age4: 35,
  //     },
  //   },
  // };

  // await usersCollection.updateOne(filter, updateDocument);
  // },
};
