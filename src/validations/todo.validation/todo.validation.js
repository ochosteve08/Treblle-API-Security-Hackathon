const Joi = require("joi");

const addTodoValidation = Joi.object({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
 
});


const getTodoValidation = Joi.object({
  id: Joi.string().required().label("Todo Id"),
});


const todoIdValidation = Joi.object({
  id: Joi.string().required().label("Todo Id"),
});

const updateTodoValidation = Joi.object().keys({
  title: Joi.string().required().label("Title"),
  description: Joi.string().required().label("Description"),
  completed: Joi.boolean().label("Completed"),
});

module.exports = {
  addTodoValidation,
  getTodoValidation,
  todoIdValidation,
  updateTodoValidation,
};

