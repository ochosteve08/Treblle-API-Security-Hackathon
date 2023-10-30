const express = require("express");
const { todoController } = require("../../controllers/");
const requireAuth = require("../../middleWare/requireAuth");
const todoRoutes = express.Router();

// require Auth for all todo
todoRoutes.use(requireAuth);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: OK
 */

//GET all  todo
todoRoutes.get("/", todoController.fetchAllTodo);

//GET a single todo
todoRoutes.get("/:id", todoController.getTodo);

//POST a new todo
todoRoutes.post("/", todoController.createTodo);

//DELETE a single todo
todoRoutes.delete("/:id", todoController.deleteTodo);

//UPDATE a single todo
todoRoutes.put("/:id", todoController.updateTodo);

module.exports = todoRoutes;
