const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/categories/:category/info', productsController.getCategoryInfo);
router.get('/categories/info', productsController.getCategories);
router.get(
  '/categories/:category/:brand',
  productsController.getProductsByBrand
);
router.get('/:search', productsController.getSearchProducts);
router.get('/selected/user/:userId', productsController.getSelectedProducts);
router.get('/cart/user/:userId', productsController.getProductsInCart);
router.get('/product/:productId', productsController.getProduct);
router.put('/create-review', productsController.createReview);
router.get('/get/popular', productsController.getPopularProducts);
router.get(
  '/get/popular-by-category/:category/:brand',
  productsController.getPopularProductsByCategory
);

module.exports = router;
