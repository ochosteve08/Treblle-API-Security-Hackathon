const { todoModel } = require("../../models");

const createTodo = async ({ title, description, completed }) => {
  return await todoModel.create({ title, description, completed });
};
const fetchAllTodo = async () => await todoModel.find().sort({ createdAt: -1 });

const getTodo = async ({ id }) => await todoModel.findOne({ _id: id });

const deleteTodo = async ({ id }) =>
  await todoModel.findByIdAndDelete({ _id: id });

const updateTodo = async ({ title, description, completed, id }) =>
  await todoModel.findByIdAndUpdate(
    id,
    { title, description, completed },
    { new: true }
  );

module.exports = {
  createTodo,
  fetchAllTodo,
  getTodo,
  deleteTodo,
  updateTodo,
};
