const rescue = require('express-rescue');
const schemasJoi = require('./schemasJoi');
const errorJoi = require('./errorJoi');
const userService = require('../service/userService');

const validateJoi = async (schema, reqInfo) =>
  schema.validateAsync(reqInfo).catch((fail) => errorJoi(fail));

const loginUser = rescue(async (req, res, next) => {
  const isValid = await validateJoi(schemasJoi.loginUser, req.body);
  if (isValid.error) return next(isValid);
  const { email, password } = req.body;
  const serviceAnswer = await userService.loginUser(email, password);
  if (serviceAnswer.error) return next(serviceAnswer);
  res.status(200).json(serviceAnswer);
});

module.exports = {
  loginUser,
};
