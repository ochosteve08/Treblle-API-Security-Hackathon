const express = require("express");
const { todoController } = require("../../controllers/");
const requireAuth = require("../../middleWare/requireAuth");
const todoRoutes = express.Router();


todoRoutes.use(requireAuth);





todoRoutes.get("/", todoController.fetchAllTodo);
todoRoutes.get("/:id", todoController.getTodo);
todoRoutes.post("/", todoController.createTodo);
todoRoutes.delete("/:id", todoController.deleteTodo);
todoRoutes.put("/:id", todoController.updateTodo);

module.exports = todoRoutes;
