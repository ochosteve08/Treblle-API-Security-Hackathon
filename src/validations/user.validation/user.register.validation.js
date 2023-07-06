const Joi = require("joi");

const userValidation = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

module.exports = {
  userValidation,
};
