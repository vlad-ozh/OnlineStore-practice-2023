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

  const validateAccesstoken = (token) => {
    try {
      const userDate = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userDate;
    } catch (error) {
      return null;
    }
  };

  const validateRefreshtoken = (token) => {
    try {
      const userDate = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userDate;
    } catch (error) {
      return null;
    }
  };

  const saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenModel.findOne({user: userId});

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }

    const token = await TokenModel.create({user: userId, refreshToken});

    return token;
  };

  const removeToken = async (refreshToken) => {
    const tokenData = await TokenModel.deleteOne({ refreshToken });

    return tokenData;
  };

  const findToken = async (refreshToken) => {
    const tokenData = await TokenModel.findOne({ refreshToken });

    return tokenData;
  };


  return {
    generateTokens: (payload) => {
      return generateTokens(payload);
    },
    validateAccesstoken: (token) => {
      return validateAccesstoken(token);
    },
    validateRefreshtoken: (token) => {
      return validateRefreshtoken(token);
    },
    saveToken: async (userId, refreshToken) => {
      return await saveToken(userId, refreshToken);
    },
    removeToken: async (refreshToken) => {
      return await removeToken(refreshToken);
    },
    findToken: async (refreshToken) => {
      return await findToken(refreshToken);
    },
  };
};

module.exports = tokenService();
