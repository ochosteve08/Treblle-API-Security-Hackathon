const { todoModel } = require("../../models");

const createTodo = async ({ title, description, userId }) => {
  return await todoModel.create({ title, description, userId });
};
const fetchAllTodo = async ({ userId, page, limit, startIndex }) => {
  const total = await todoModel.countDocuments({ userId });
  const todos = await todoModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit)
  

    const result = {
      todos,
      total,
      totalPages: Math.ceil(total / limit),
      limit,
      currentPage: page,
    };
    return result;
};
const getTodo = async ({ id }) => await todoModel.findOne({ _id: id });

const deleteTodo = async ({ id }) =>
  await todoModel.findByIdAndDelete({ _id: id });

const updateTodo = async ({ title, description, completed, id }) =>
  await todoModel.findByIdAndUpdate(
    id,
    { title, description, completed },
    { new: true }
  );

const searchTodo = async (query) => {
  const todos = await todoModel.find(query);
  return todos;
};

module.exports = {
  createTodo,
  fetchAllTodo,
  getTodo,
  deleteTodo,
  updateTodo,
  searchTodo,
};
