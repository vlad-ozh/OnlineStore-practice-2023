const router = require('express').Router();
const controller = require('./controller');

router.get('/allProducts', controller.allProducts);

module.exports = router;
