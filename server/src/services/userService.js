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

  const allUsers = async () => {
    return await UserModel.find();
  };


  return {
    register: async (email, name, password) => {
      return await register(email, name, password);
    },
    login: async (email, password) => {
      return await login(email, password);
    },
    logout: async (refreshToken) => {
      return await logout(refreshToken);
    },
    activate: async (activationLink) => {
      return await activate(activationLink);
    },
    refresh: async (refreshToken) => {
      return await refresh(refreshToken);
    },
    allUsers: async () => {
      return await allUsers();
    },
  };
};

module.exports = userService();
