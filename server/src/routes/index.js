const router = require('express').Router();

const user = require('./userRoutes');
const products = require('./productsRoutes');

router.use('/user', user);
router.use('/products', products);

module.exports = router;
