const enseedlingValidator = require("@Enseedling/enseedling-validations");
const Joi = require("joi");

const Joi = require("joi");

const addTodoValidation = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
});


const Joi = require("joi");

const getTodoValidation = Joi.object({
  TodoId: Joi.string().required().label("Todo Id"),
});


const todoIdValidation = Joi.object({
  TodoId: Joi.string().required().label("Todo Id"),
});

const updateTodoValidation = Joi.object().keys({
   title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
});

module.exports = {
  addTodoValidation,
  getTodoValidation,
  todoIdValidation,
  updateTodoValidation,
};

