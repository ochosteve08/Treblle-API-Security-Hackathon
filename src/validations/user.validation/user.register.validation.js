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
    .max(128)
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. Minimum length is 8 characters."
    )
    .required(),
});

module.exports = {
  userValidation,
};
