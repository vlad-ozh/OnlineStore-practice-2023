const router = require('express').Router();
const { userController } = require('../controllers');
const { body } = require('express-validator');

router.get('/allUsers', userController.allUsers);
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({min: 4, max: 20}),
  userController.register,
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

module.exports = router;
