const router = require('express').Router();

const user = require('./userRoutes');
const products = require('./productsRoutes');
const images = require('./imagesRoutes');

router.use('/user', user);
router.use('/products', products);
router.use('/image', images);

module.exports = router;
