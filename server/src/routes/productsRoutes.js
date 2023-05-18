const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/:category/info', productsController.getCategoryInfo);
router.get('/:category/:brand', productsController.getProductsByBrand);
router.get('/:search', productsController.getSearchProducts);

module.exports = router;
