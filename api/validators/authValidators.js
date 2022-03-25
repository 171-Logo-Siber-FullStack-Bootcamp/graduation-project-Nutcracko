//Joi lib used for json validations
const Joi = require("joi");

//!USER VALIDATORS
//REGISTER VALIDATION
registerValidation = async (user) => {
  regSchema = new Joi.object({
    username: Joi.string().min(6).max(64).required(),
    email: Joi.string().min(6).max(256).required().email(),
    password: Joi.string().min(8).max(256).required(),
  });
  const result = await regSchema.validate(user);
  return result;
};

//LOGIN VALIDATION
loginValidation = async (user) => {
  loginSchema = new Joi.object({
    email: Joi.string().min(6).max(256).required().email(),
    password: Joi.string().min(8).max(256).required(),
  });
  const result = await loginSchema.validate(user);
  return result;
};

//!Seller VALIDATORS
//REGISTER VALIDATION
sellerRegisterValidation = async (seller) => {
  regSchema = new Joi.object({
    username: Joi.string().min(6).max(64).required(),
    email: Joi.string().min(6).max(256).required().email(),
    password: Joi.string().min(8).max(256).required(),
  });
  const result = await regSchema.validate(seller);
  return result;
};

//LOGIN VALIDATION
sellerLoginValidation = async (seller) => {
  loginSchema = new Joi.object({
    email: Joi.string().min(6).max(256).required().email(),
    password: Joi.string().min(8).max(256).required(),
  });
  const result = await loginSchema.validate(seller);
  return result;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

module.exports.sellerRegisterValidation = sellerRegisterValidation;
module.exports.sellerLoginValidation = sellerLoginValidation;
