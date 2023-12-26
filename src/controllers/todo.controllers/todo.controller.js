const { todoServices } = require("../../services");
const { todoValidation } = require("../../validations");
const { Transaction } = require("../../utils");
const { success, error } = require("../../lib-handler");
const { todoModel } = require("../../models");

// create a new todo item
const createTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const { title, description } =
      await todoValidation.addTodoValidation.validateAsync(req.body);
    const userId = req.user._id;

    const todo = await todoServices.createTodo({
      title,
      description,
      userId,
    });

    await transaction.commitTransaction();
    return success.handler({ todo }, req, res, next);
  } catch (err) {
    await transaction.abortTransaction();
    return error.handler(err, req, res, next);
  } finally {
    await transaction.endSession();
  }
};

// get a single todo item
const getTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const { id } = await todoValidation.todoIdValidation.validateAsync(
      req.params
    );
    const todo = await todoServices.getTodo({ id });
    if (!todo) {
      throw error.throwNotFound({ message: "todo not found" });
    }
    await transaction.commitTransaction();
    return success.handler({ todo }, req, res, next);
  } catch (err) {
    await transaction.abortTransaction();
    return error.handler(err, req, res, next);
  } finally {
    await transaction.endSession();
  }
};

//get all todo items
const fetchAllTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
     const userId = req.user._id;
     const page = parseInt(req.query.page || 1);
     const limit = parseInt(req.query.limit) || 20;
     const startIndex = (page - 1) * limit;

 

    const todos = await todoServices.fetchAllTodo({ userId, page, limit, startIndex });

    await transaction.commitTransaction();
    return success.handler(todos, req, res, next);
  } catch (err) {
    await transaction.abortTransaction();
    return error.handler(err, req, res, next);
  } finally {
    await transaction.endSession();
  }
};

//update todo item
const updateTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const { title, description, completed } =
      await todoValidation.updateTodoValidation.validateAsync(req.body);
    const { id } = await todoValidation.todoIdValidation.validateAsync(
      req.params
    );
    const updatedTodo = await todoServices.updateTodo({
      title,
      description,
      completed,
      id,
    });
    await transaction.commitTransaction();
    return success.handler({ updatedTodo }, req, res, next);
  } catch (err) {
    await transaction.abortTransaction();
    return error.handler(err, req, res, next);
  } finally {
    await transaction.endSession();
  }
};

//delete todo item
const deleteTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();

    const { id } = await todoValidation.todoIdValidation.validateAsync(
      req.params
    );
    const todo = await todoServices.deleteTodo({ id });
    if (!todo) {
      throw error.throwNotFound({ message: "todo not found" });
    }
    await transaction.commitTransaction();
    return success.handler({ todo }, req, res, next);
  } catch (err) {
    await transaction.abortTransaction();
    return error.handler(err, req, res, next);
  } finally {
    await transaction.endSession();
  }
};

const searchByTitleOrDescription = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  const { title, description } = req.query;

  try {
    await transaction.startTransaction();
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (description) {
      query.description = { $regex: description, $options: "i" };
    }
    const todos = await todoServices.searchTodo(query);
    if (!todos) {
      throw error.throwNotFound({ message: "todos not found" });
    }

    await transaction.commitTransaction();
    return success.handler({ todos }, req, res, next);
  } catch (err) {
    await transaction.abortTransaction();
    return error.handler(err, req, res, next);
  } finally {
    await transaction.endSession();
  }
};

module.exports = {
  createTodo,
  fetchAllTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  searchByTitleOrDescription,
};
