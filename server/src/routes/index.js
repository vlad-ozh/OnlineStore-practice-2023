const router = require('express').Router();

const user = require('./user');
const products = require('./products');

router.use('/users', user);
router.use('/products', products);

module.exports = router;
