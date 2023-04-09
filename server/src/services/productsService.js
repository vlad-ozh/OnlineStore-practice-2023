const { connection } = require('mongoose');

module.exports = {
  allProducts: async () => {
    const allCollections = await connection.db.collections();

    return Promise.all(
      allCollections.map(async (currentCollection) => {
        const collectionName = currentCollection.collectionName;

        if (collectionName !== 'users') {
          const collectionValue = await currentCollection.find().toArray();

          return {
            name: collectionName,
            value: collectionValue,
          };
        }

        return undefined;
      }),
    ).then((res) => {
      let collectionsValues = {};

      res.forEach((collection) => {
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
