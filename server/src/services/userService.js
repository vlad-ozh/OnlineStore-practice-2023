const { UserModel } = require('../models');
const mailService = require('./mailService')();
const tokenService = require('./tokenService');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const { UserDto, TokenDto } = require('../dtos');
const ApiError = require('../exceptions/apiError');

const userService = () => {
  const generateUserAndTokens = async (user, prevRefreshToken = undefined) => {
    const userDto = UserDto(user);
    const tokenDto = TokenDto(user);
    const tokens = tokenService.generateTokens({...tokenDto});

    await tokenService.saveRefreshToken(
      tokenDto.id,
      tokens.refreshToken,
      prevRefreshToken
    );

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

    return generateUserAndTokens(user);
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

    return generateUserAndTokens(user);
  };

  const logout = async (refreshToken) => {
    await tokenService.removeOneRefreshToken(refreshToken);
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
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshtoken(refreshToken);

    if (!userData) throw ApiError.UnauthorizedError();

    const user = await UserModel.findById(userData.id);

    return generateUserAndTokens(user, refreshToken);
  };

  const checkToken = async (token) => {
    const userData = tokenService.validateRefreshtoken(token);

    return userData ? true : false;
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
    const resetToken = tokenService.generateResetToken({...tokenDto});
    await tokenService.saveResetToken(tokenDto.id, resetToken);

    await mailService.sendResetPasswordMail(
      email,
      `${process.env.CLIENT_URL}/account/reset/password/${resetToken}`,
      user.name
    );
  };

  const resetPassword = async (password, token) => {
    const userData = tokenService.validateRefreshtoken(token);

    if (!userData) throw ApiError.BadRequest('activationLinkInvalid');

    const user = await UserModel.findById(userData.id);
    const hashPassword = await bcrypt.hash(password, 3);
    user.password = hashPassword;
    await user.save();

    await tokenService.removeAllRefreshTokens(userData.id);

    return generateUserAndTokens(user);
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

  const changeAmountProductBuy = async (
    userId,
    productId,
    amount,
    value
  ) => {
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

  const changeName = async (userId, userName, refreshToken) => {
    const user = await UserModel.findOne({ id: userId });

    if (!user) {
      throw ApiError.BadRequest('noUserFound');
    }

    user.name = userName.trim();

    await user.save();

    return generateUserAndTokens(user, refreshToken);
  };

  const changePassword = async (
    userId,
    currentPassword,
    newPassword,
    refreshToken
  ) => {
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

    return generateUserAndTokens(user, refreshToken);
  };

  const deleteAcc = async (userId) => {
    const user = await UserModel.findOneAndDelete({ id: userId });
    await tokenService.deleteUserTokens(user._id);
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
