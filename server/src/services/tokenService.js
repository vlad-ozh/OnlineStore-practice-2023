const { TokenModel } = require('../models');
const jwt = require('jsonwebtoken');

const tokenService = () => {

  const generateTokens = (payload) => {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      {expiresIn: '15m'}
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '20d'}
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  const generateResetToken = (payload) => {
    const resetToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '12h'}
    );

    return resetToken;
  };

  const validateRefreshtoken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData;
    } catch (error) {
      return null;
    }
  };

  const saveRefreshToken = async (
    userId,
    newRefreshToken,
    prevRefreshToken
  ) => {
    const tokensData = await TokenModel.findOne({ userId });

    if (tokensData) {

      if (tokensData.resetToken) tokensData.resetToken = null;

      tokensData.refreshTokens = tokensData.refreshTokens
        .map(token => validateRefreshtoken(token) ? token : null)
        .filter(token => token !== null);

      if (prevRefreshToken !== undefined) {
        tokensData.refreshTokens = tokensData.refreshTokens.map(refreshToken =>
          refreshToken === prevRefreshToken ? newRefreshToken : refreshToken
        );
      } else {
        tokensData.refreshTokens =
          tokensData.refreshTokens.concat(newRefreshToken);
      }

      return await tokensData.save();
    }

    return await TokenModel.create({
      userId,
      refreshTokens: [ newRefreshToken ],
      resetToken: null,
    });
  };

  const saveResetToken = async (userId, resetToken) => {
    const tokensData = await TokenModel.findOne({ userId });

    tokensData.resetToken = resetToken;

    await tokensData.save();
  };

  const removeOneRefreshToken = async (refreshToken) => {
    const userId = validateRefreshtoken(refreshToken).id;

    const tokensData = await TokenModel.findOne({ userId });

    tokensData.refreshTokens = tokensData.refreshTokens.filter(token =>
      token !== refreshToken
    );

    await tokensData.save();
  };

  const removeAllRefreshTokens = async (userId) => {
    const tokensData = await TokenModel.findOne({ userId });

    tokensData.refreshTokens = [];

    await tokensData.save();
  };

  const deleteUserTokens = async (userId) => {
    await TokenModel.deleteOne({ userId });
  };

  return {
    generateTokens,
    generateResetToken,
    validateRefreshtoken,
    saveRefreshToken,
    saveResetToken,
    removeOneRefreshToken,
    removeAllRefreshTokens,
    deleteUserTokens,
  };
};

module.exports = tokenService();
