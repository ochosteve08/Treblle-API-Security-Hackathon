const Joi = require("joi");

const userValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .label("Email")
    .max(255),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%+\\/!#?$\[\]{}()_\-.])[A-Za-z\d@%+\\/!#?$\[\]{}()_\-.]{8,}$/
    )
    .min(8)
    .max(128),
});

module.exports = {
  userValidation,
};
