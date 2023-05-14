const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/:category/info', productsController.getCategoryInfo);
router.get('/:category/:brand', productsController.getProductsByBrand);

module.exports = router;
