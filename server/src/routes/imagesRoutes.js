const router = require('express').Router();
const { imagesController } = require('../controllers');

router.get('/:category/:filename', imagesController.getImage);

module.exports = router;
