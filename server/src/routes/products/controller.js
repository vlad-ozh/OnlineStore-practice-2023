const productsModel = require('./service');

module.exports = {
  allProducts: (req, res) => {
    try {
      productsModel.allProducts()
        .then(result => {
          return res
            .header('Access-Control-Allow-Origin', '*')
            .send(result);
        });
    } catch (error) {
      return res
        .header('Access-Control-Allow-Origin', '*')
        .send(error);
    }
  },
};
