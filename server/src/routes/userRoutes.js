const router = require('express').Router();
const { userController } = require('../controllers');
const { body } = require('express-validator');

router.post(
  '/register',
  body('email').trim().notEmpty().isEmail(),
  body('name').trim().notEmpty(),
  body('password').trim().notEmpty().isLength({min: 4, max: 20}),
  userController.register
);
router.post(
  '/login',
  body('email').notEmpty(),
  body('password').notEmpty(),
  userController.login
);
router.post('/logout', userController.logout);
router.post(
  '/forgot/password',
  body('email').trim().notEmpty(),
  userController.forgotPassword
);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/check/token/:token', userController.checkToken);
router.post(
  '/reset/password/:token',
  body('password').trim().notEmpty().isLength({min: 4, max: 20}),
  userController.resetPassword
);
router.put('/add/product-to-selected', userController.addProductToSelected);

module.exports = router;
