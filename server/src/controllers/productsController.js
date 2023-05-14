const { productsService } = require('../services');

module.exports = {
  getCategoryInfo: async (req, res, next) => {
    try {
      const category = req.params.category;

      const categoryInfo = await productsService.getCategoryInfo(category);

      return res.json(categoryInfo);
    } catch (error) {
      next(error);
    }
  },
  getProductsByBrand: async (req, res, next) => {
    try {
      const { category, brand } = req.params;

      const products =
        await productsService.getProductsByBrand(category, brand);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  },
};
