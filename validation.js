const Joi = require('@hapi/joi');
const res = require('express/lib/response');
const { model } = require('mongoose');

//Register validation
const registerValidation = (data) => {
  const schema = {
    name: Joi.string().max(255).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(255)
  };
  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(255)
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
