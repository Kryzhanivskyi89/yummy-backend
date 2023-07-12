const Joi = require("joi");

const { emailRegexp, passwordRegexp } = require("../../constants/patterns");

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required email field`,
    "string.empty": `Email can contain capital and small Latin letters (A-Z, a-z), numbers (from 0 to 9) and special symbols !#$%^&*_-=*/?+ but no more than 64 characters`,
  }),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .min(6)
    .max(16)
    .messages({
      "any.required": `missing required password field`,
      "string.empty": `Password must include numbers and letters - the minimum number of characters in the field - 6 (inclusive), the maximum - 16 (inclusive)`,
    }),
});

module.exports = loginSchema;
