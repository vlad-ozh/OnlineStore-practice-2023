const router = require('express').Router();
const { productsController } = require('../../controllers');

router.get('/allProducts', productsController.allProducts);

module.exports = router;
