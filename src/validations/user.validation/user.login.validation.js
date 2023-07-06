const Joi = require("joi");

const userLoginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email")
    .max(255),
  password: Joi.string().min(8).required().label("Password"),
});

module.exports = {
  userLoginValidation,
};
