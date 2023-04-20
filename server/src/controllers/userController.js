const { userService } = require('../services');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

const addCookieRefreshToken = (res, refreshToken) => {
  return res.cookie(
    'refreshToken',
    refreshToken,
    {
      maxAge: 30 * 24 * 60 * 60 * 10000,
      httpOnly: true,
      secure: true,
      sameSite: none,
    },
  );
};

module.exports = {
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('validationError', errors.array()));
      }

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
  activate: async (req, res, next) => {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.PRODUCTION_CLIENT_URL);
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
  allUsers: async (req, res) => {
    try {
      const users = await userService.allUsers();

      return res.json(users);
    } catch (error) {
      next(error);
    }
  },
};
