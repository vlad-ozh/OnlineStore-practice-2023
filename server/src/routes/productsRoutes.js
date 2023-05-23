const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/:category/info', productsController.getCategoryInfo);
router.get('/:category/:brand', productsController.getProductsByBrand);
router.get('/:search', productsController.getSearchProducts);
router.get('/selected/user/:userId', productsController.getSelectedProducts);
router.get('/cart/user/:userId', productsController.getProductsInCart);

module.exports = router;
