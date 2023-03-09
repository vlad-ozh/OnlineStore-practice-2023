const router = require('express').Router();
const controller = require('./controller');

router.get('/allUsers', controller.allUsers);
router.get('/add', controller.create);
router.get('/find', controller.findUser);

module.exports = router;
