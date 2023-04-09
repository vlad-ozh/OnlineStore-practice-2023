const { productsService } = require('../services');

module.exports = {
  allProducts: (req, res) => {
    try {
      productsService.allProducts().then((result) => {
        return res.header('Access-Control-Allow-Origin', '*').send(result);
      });
    } catch (error) {
      return res.header('Access-Control-Allow-Origin', '*').send(error);
    }
  },
};
