const Joi = require('@hapi/joi/');

const loginUser = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().min(6).max(50).required(),
});

module.exports = {
  loginUser,
};
