const Joi = require("joi");

//REGISTER VALIDATION
createValidation = async (product) => {
  productSchema = new Joi.object({
    name: Joi.string().min(3).max(64).required(),
    description: Joi.string().min(3).max(256).required(),
    category: Joi.string().min(4).max(128).required(),
    price: Joi.required(),
  });
  const result = await productSchema.validate(product);
  return result;
};

module.exports = { createValidation };
