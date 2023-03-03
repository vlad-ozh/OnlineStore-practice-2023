const router = require('express').Router();
const controller = require('./controller');

router.get('/add', controller.create);
router.get('/find', controller.findUser);

module.exports = router;
