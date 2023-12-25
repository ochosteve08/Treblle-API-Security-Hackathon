const { todoModel } = require("../../models");

const createTodo = async ({
  title,
  description,
  userId,
}) => {
  return await todoModel.create({ title, description, userId });
};
const fetchAllTodo = async ({ userId }) =>
  await todoModel.find({ userId }).sort({ createdAt: -1 });

const getTodo = async ({ id }) => await todoModel.findOne({ _id: id });

const deleteTodo = async ({ id }) =>
  await todoModel.findByIdAndDelete({ _id: id });

const updateTodo = async ({ title, description, completed, id }) =>
  await todoModel.findByIdAndUpdate(
    id,
    { title, description, completed },
    { new: true }
  );

const searchTodo = async (query)=>{
  const todos  = await todoModel.find(query)
  return todos;

}

module.exports = {
  createTodo,
  fetchAllTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  searchTodo,
};
