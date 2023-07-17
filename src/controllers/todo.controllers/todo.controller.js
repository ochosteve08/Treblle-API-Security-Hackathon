const { todoServices } = require("../../services");
const { todoValidation } = require("../../validations");
const { Transaction } = require("../../utils");

// create a new todo item
const createTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const { title, description } =
      await todoValidation.addTodoValidation.validateAsync(req.body);
       const user_id = req.user._id;

    const todo = await todoServices.createTodo({
      title,
      description,
      user_id,
    });

    res.status(200).json({ todo }, req, res, next);
    await transaction.commitTransaction();
  } catch (error) {
    await transaction.abortTransaction();
    res.status(400).json({ error: error.message }, req, res, next);
  }
    finally {
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
      return res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json({ todo }, req, res, next);
    await transaction.commitTransaction();
  } catch (error) {
    await transaction.abortTransaction();
    res.status(400).json({ error: error.message }, req, res, next);
  } finally {
    await transaction.endSession();
  }
  
};

//get all todo items
const fetchAllTodo = async (req, res, next) => {
  const transaction = await Transaction.startSession();
  try {
    await transaction.startTransaction();
    const user_id = req.user._id;
    const todo = await todoServices.fetchAllTodo({ user_id });
    res.status(200).json({ todo }, req, res, next);
    await transaction.commitTransaction();
  } catch (error) {
    await transaction.abortTransaction();
    res.status(400).json({ error: error.message }, req, res, next);
  } finally {
    await transaction.endSession();
  }
   
};

//update todo item
const updateTodo = async (req, res, next) => {
   const transaction = await Transaction.startSession();
  try {
     await transaction.startTransaction();
     const { title, description, completed } = await todoValidation.updateTodoValidation.validateAsync(req.body);
     const { id } = await todoValidation.todoIdValidation.validateAsync(
     req.params
   );
    const updatedTodo = await todoServices.updateTodo({
      title,
      description,
      completed,
      id,
    });
    res.status(200).json({ updatedTodo }, req, res, next);
    await transaction.commitTransaction();
  } catch (error) {
    await transaction.abortTransaction();
    res.status(400).json({ error: error.message }, req, res, next);
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
     return res.status(404).json({ message: "todo not found" });
   }

   res.status(200).json({ todo }, req, res, next);
   await transaction.commitTransaction();
 } catch (error) {
   await transaction.abortTransaction();
   res.status(400).json({ error: error.message }, req, res, next);
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
};
