const { productsService } = require('../services');

module.exports = {
  getAll: async (req, res) => {
    try {
      const products = await productsService.getAll();

      return res.json(products);
    } catch (error) {
      return res.json(error);
    }
  },
};
