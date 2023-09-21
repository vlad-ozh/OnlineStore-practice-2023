const { userService } = require('../services');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

const addCookieRefreshToken = (res, refreshToken) => {
  res.cookie(
    'refreshToken',
    refreshToken,
    {
      maxAge: 30 * 24 * 60 * 60 * 10000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    }
  );
};

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, name, password } = req.body;

      const userData = await userService.register(email, name, password);

      addCookieRefreshToken(res, userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userData = await userService.login(email, password);

      addCookieRefreshToken(res, userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;

      const token = await userService.forgotPassword(email);

      return res.json(token);
    } catch (error) {
      next(error);
    }
  },
  activate: async (req, res, next) => {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      addCookieRefreshToken(res, userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  checkToken: async (req, res, next) => {
    try {
      const token = req.params.token;
      const isToken = await userService.checkToken(token);

      return res.json({ isToken });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { password, isToken } = req.body;
      const token = req.params.token;

      const userData =
        await userService.resetPassword(password, isToken, token);

      addCookieRefreshToken(res, userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  addProductToSelected: async (req, res, next) => {
    try {
      const { userId, productId } = req.body;

      const userData =
        await userService.addProductToSelected(userId, productId);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  removeProductFromSelected: async (req, res, next) => {
    try {
      const { userId, productId } = req.body;

      const userData =
        await userService.removeProductFromSelected(userId, productId);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  addProductToCart: async (req, res, next) => {
    try {
      const { userId, productId } = req.body;

      const userData =
        await userService.addProductToCart(userId, productId);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  removeProductFromCart: async (req, res, next) => {
    try {
      const { userId, productId } = req.body;

      const userData =
        await userService.removeProductFromCart(userId, productId);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  changeAmountProductBuy: async (req, res, next) => {
    try {
      const { userId, productId, amount, value } = req.body;

      const userData = await userService.changeAmountProductBuy(
        userId,
        productId,
        amount,
        value
      );

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  changeName: async (req, res, next) => {
    try {
      const { userId, userName } = req.body;

      const userData = await userService.changeName( userId, userName );

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  // changePassword: async (req, res, next) => {
  //   try {
  // const { userId, userName } = req.body;

  // const userData = await userService.changePassword( userId, userName );

  // return res.json(userData);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  deleteAcc: async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const userData = await userService.deleteAcc( userId );
      res.clearCookie('refreshToken');

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  },
  validateCheckoutInfo: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('checkoutInfoInvalid', errors.array())
        );
      }
    } catch (error) {
      next(error);
    }
  },
};
