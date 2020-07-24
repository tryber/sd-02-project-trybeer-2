const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const loginUser = async (email, paramPassword) => {
  const result = await userModel.getUserByEmail(email);
  if (!result) {
    return { error: true, message: 'E-mail not found.', code: 'unauthorized' };
  }
  if (result.password !== paramPassword) {
    return { error: true, message: 'The password does not match.', code: 'unauthorized' };
  }
  const { id, password, ...userInfo } = result;
  const token = jwt.sign({ data: userInfo }, jwtSecret, jwtConfig);
  userInfo.token = token;
  return userInfo;
};

module.exports = {
  loginUser,
};
