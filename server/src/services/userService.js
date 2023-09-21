const { UserModel } = require('../models');
const mailService = require('./mailService')();
const tokenService = require('./tokenService');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { UserDto, TokenDto } = require('../dtos');
const ApiError = require('../exceptions/apiError');

const userService = () => {
  const userAndTokens = async (user) => {
    const userDto = UserDto(user);
    const tokenDto = TokenDto(user);
    const tokens = tokenService.generateTokens({...tokenDto});
    await tokenService.saveToken(tokenDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  };

  const register = async (email, name, password) => {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest('candidateExists');
    }

    const id = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      id,
      email,
      name,
      password: hashPassword,
      activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/user/activate/${activationLink}`,
      name
    );

    return userAndTokens(user);
  };

  const login = async (email, password) => {
    const user = await UserModel.findOne({ email });

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
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('noUserFound');
    }

    if (!user.isActivated) {
      throw ApiError.BadRequest('accountNotActivated');
    }

    const tokenDto = TokenDto(user);
    const token = tokenService.generateToken({...tokenDto});
    await tokenService.saveToken(tokenDto.id, token);

    await mailService.sendResetPasswordMail(
      email,
      `${process.env.CLIENT_URL}/account/reset/password/${token}`,
      user.name
    );

    return token;
  };

  const activate = async (activationLink) => {
    const user = await UserModel.findOne({ activationLink });

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

  const addProductToSelected = async (userId, productId) => {
    const user = await UserModel.findOne({ id: userId });

    user.selectedProducts = user.selectedProducts.concat(productId);

    await user.save();

    return UserDto(user);
  };

  const removeProductFromSelected = async (userId, productId) => {
    const user = await UserModel.findOne({ id: userId });

    user.selectedProducts = user.selectedProducts.filter(product =>
      product !== productId
    );

    await user.save();

    return UserDto(user);
  };

  const addProductToCart = async (userId, productId) => {
    const user = await UserModel.findOne({ id: userId });

    user.cart = user.cart.concat({ id: productId, amount: 1});

    await user.save();

    return UserDto(user);
  };

  const removeProductFromCart = async (userId, productId) => {
    const user = await UserModel.findOne({ id: userId });

    user.cart = user.cart.filter(product =>
      product.id !== productId
    );

    await user.save();

    return UserDto(user);
  };

  const changeAmountProductBuy = async (userId, productId, amount, value) => {
    const user = await UserModel.findOne({ id: userId });
    let correctValue = value;

    if (value < 1) {
      correctValue = 1;
    } else if (value > amount) {
      correctValue = amount;
    }

    const newCart = user.cart.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          amount: correctValue,
        };
      }

      return product;
    });

    user.cart = newCart;

    await user.save();

    return UserDto(user);
  };

  const changeName = async (userId, userName) => {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw ApiError.BadRequest('noUserFound');
    }

    user.name = userName.trim();

    await user.save();

    return userAndTokens(user);
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw ApiError.BadRequest('noUserFound');
    }

    const isPassEquals = await bcrypt.compare(currentPassword, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('passwordInvalid');
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 3);

    user.password = hashNewPassword;

    await user.save();

    return userAndTokens(user);
  };

  const deleteAcc = async (userId) => {
    const user = await UserModel.deleteOne({ id: userId });

    return user;
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
    addProductToSelected,
    removeProductFromSelected,
    addProductToCart,
    removeProductFromCart,
    changeAmountProductBuy,
    changeName,
    deleteAcc,
    changePassword,
  };
};

module.exports = userService();
