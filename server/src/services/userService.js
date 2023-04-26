const { UserModel } = require('../models');
const mailService = require('./mailService')();
const tokenService = require('./tokenService');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exceptions/apiError');

const userService = () => {
  const userAndTokens = async (user) => {
    const userDto = UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  };

  const register = async (email, name, password) => {
    const candidate = await UserModel.findOne({email});

    if (candidate) {
      throw ApiError.BadRequest('candidateExists');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      name,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/user/activate/${activationLink}`,
      name,
    );

    return userAndTokens(user);
  };

  const login = async (email, password) => {
    const user = await UserModel.findOne({email});

    if (!user) {
      throw ApiError.BadRequest('noUserFound');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('passwordInvalid');
    }

    return userAndTokens(user);
  };

  const logout = async (refreshToken) => {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  };

  const forgotPassword = async (email) => {
    const user = await UserModel.findOne({email});

    if (!user) {
      throw ApiError.BadRequest('noUserFound');
    }

    const userDto = UserDto(user);
    const token = tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, token);

    await mailService.sendResetPasswordMail(
      email,
      `${process.env.CLIENT_URL}/account/reset/password/${token}`,
      user.name,
    );

    return token;
  };

  const activate = async (activationLink) => {
    const user = await UserModel.findOne({activationLink});

    if (!user) {
      throw ApiError.BadRequest('activationLinkInvalid');
    }

    user.isActivated = true;
    await user.save();
  };

  const refresh = async (refreshToken) => {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshtoken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);

    return userAndTokens(user);
  };
  const checkToken = async (token) => {
    const userData = tokenService.validateRefreshtoken(token);
    const tokenFromDb = await tokenService.findToken(token);

    if (!userData || !tokenFromDb) {
      return false;
    }

    return true;
  };

  const resetPassword = async (password, isToken, token) => {
    if (!isToken) {
      throw ApiError.BadRequest('activationLinkInvalid');
    }

    const userData = tokenService.validateRefreshtoken(token);
    const user = await UserModel.findById(userData.id);
    const hashPassword = await bcrypt.hash(password, 3);
    user.password = hashPassword;
    await user.save();

    return userAndTokens(user);
  };


  return {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    activate,
    refresh,
    checkToken,
  };
};

module.exports = userService();
