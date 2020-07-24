const Joi = require('@hapi/joi/');

const loginUser = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(50).required(),
});

const createUser = Joi.object({
  name: Joi.string().min(12).max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(50).required(),
  role: Joi.boolean().required(),
});

module.exports = {
  loginUser,
  createUser,
};
