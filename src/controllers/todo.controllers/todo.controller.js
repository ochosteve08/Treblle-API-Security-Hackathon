const { todoServices } = require("../../services");
const mongoose = require("mongoose");

// create a new todo item
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const todo = await todoServices.createTodo({
      title,
      description,
     
    });

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
};

// get a single todo item
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.params.id) {
      return res.status(404).json({ message: "id not found" });
    }
    if (!mongoose.Types.ObjectId.isValid({ id })) {
      return res.status(404).json({ message: "no todo with such id" });
    }

    const todo = await todoService.getTodo({ id });
    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  
};

//get all todo items
const fetchAllTodo = async (req, res) => {
  try {
    const todo = await todoService.fetchAllTodo();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
};

//update todo item
const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const { id } = req.params;
    const updatedTodo = await todoService.updateTodo({
      title,
      description,
      completed,
      id,
    });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete todo item
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.params.id) {
      return res.status(404).json({ message: "id not found" });
    }
    if (!mongoose.Types.ObjectId.isValid({ id })) {
      return res.status(404).json({ message: "no todo with such id" });
    }

    const todo = await todoService.deleteTodo({ id });
    if (!todo) {
      return res.status(404).json({ message: "todo not found" });
    }

    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTodo,
  fetchAllTodo,
  getTodo,
  deleteTodo,
  updateTodo,
};
