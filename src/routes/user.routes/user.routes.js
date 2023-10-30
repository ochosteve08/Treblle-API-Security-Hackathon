const express = require("express");
const {userController} = require("../../controllers");

const userRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: OK
 */

userRoutes.post("/register", userController.registerUser);
userRoutes.post("/login", userController.userLogin);

module.exports = userRoutes;
