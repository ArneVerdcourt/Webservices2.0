const Joi = require('@hapi/joi');
const { model } = require('mongoose');

//Register validation
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(255)
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(255)
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
