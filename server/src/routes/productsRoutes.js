const router = require('express').Router();
const { productsController } = require('../controllers');

router.get('/all', productsController.getAll);

module.exports = router;
