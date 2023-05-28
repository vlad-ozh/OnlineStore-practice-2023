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
  getSearchProducts: async (req, res, next) => {
    try {
      const { search } = req.params;

      const products =
        await productsService.getSearchProducts(search);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  },
  getSelectedProducts: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const products =
        await productsService.getSelectedProducts(userId);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  },
  getProductsInCart: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const products =
        await productsService.getProductsInCart(userId);

      return res.json(products);
    } catch (error) {
      next(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;

      const product =
        await productsService.getProduct(productId);

      return res.json(product);
    } catch (error) {
      next(error);
    }
  },
  createReview: async (req, res, next) => {
    try {
      const { userId, productId, rating, text } = req.body;

      const product =
        await productsService.createReview(userId, productId, rating, text);

      return res.json(product);
    } catch (error) {
      next(error);
    }
  },
};
