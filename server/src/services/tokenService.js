const { TokenModel } = require('../models');
const jwt = require('jsonwebtoken');

const tokenService = () => {

  const generateTokens = (payload) => {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      {expiresIn: '15m'},
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '30d'},
    );
    return {
      accessToken,
      refreshToken,
    };
  };

  const generateToken = (payload) => {
    const token = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '12h'},
    );

    return token;
  };

  const validateRefreshtoken = (token) => {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData;
    } catch (error) {
      return null;
    }
  };

  const saveToken = async (userId, token) => {
    const tokenData = await TokenModel.findOne({user: userId});

    if (tokenData) {
      tokenData.token = token;

      return await tokenData.save();
    }

    const newToken = await TokenModel.create({user: userId, token});

    return newToken;
  };

  const removeToken = async (refreshToken) => {
    const tokenData = await TokenModel.deleteOne({ token: refreshToken });

    return tokenData;
  };

  const findToken = async (token) => {
    const tokenData = await TokenModel.findOne({ token });

    return tokenData;
  };


  return {
    generateTokens,
    generateToken,
    validateRefreshtoken,
    saveToken,
    removeToken,
    findToken,
  };
};

module.exports = tokenService();
