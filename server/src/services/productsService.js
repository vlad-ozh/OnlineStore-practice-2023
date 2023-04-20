const { connection } = require('mongoose');

const productsService = () => {
  const getAllProducts = async () => {
    const allCollections = await connection.db.collections();

    return Promise.all(
      allCollections.map(async (currentCollection) => {
        const collectionName = currentCollection.collectionName;

        if (collectionName !== 'users' && collectionName !== 'tokens') {
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
  };

  return {
    getAll: async () => {
      return await getAllProducts();
    },
  };
};

module.exports = productsService();
