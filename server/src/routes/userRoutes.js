const router = require('express').Router();
const { userController } = require('../controllers');
const { body } = require('express-validator');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/forgot/password', userController.forgotPassword);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/check/token/:token', userController.checkToken);
router.post('/reset/password/:token', userController.resetPassword);
router.put('/add/product-to-selected', userController.addProductToSelected);
router.put(
  '/remove/product-from-selected',
  userController.removeProductFromSelected
);
router.put('/add/product-to-cart', userController.addProductToCart);
router.put('/remove/product-from-cart', userController.removeProductFromCart);
router.put('/change/amount-product-buy', userController.changeAmountProductBuy);
router.post(
  '/validate/checkout/info',
  body('name').trim().notEmpty().matches(/^[a-zA-Z.\s]+$/),
  body('phone').trim().notEmpty().isMobilePhone('uk-UA'),
  body('city').trim().notEmpty(),
  body('postNum').trim().notEmpty().isInt({ min: 1 }),
  userController.validateCheckoutInfo
);

module.exports = router;
