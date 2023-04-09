const router = require('express').Router();
const { userController } = require('../../controllers');

router.get('/allUsers', userController.allUsers);
router.get('/add', userController.create);
router.get('/find', userController.findUser);

module.exports = router;
