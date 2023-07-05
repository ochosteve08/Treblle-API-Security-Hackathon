const express = require("express");
const todoRoutes = require("./todo.route");

const todoRoute = express.Router();

todoRoute.use(todoRoutes);
todoRoute.use("*", () => error.throwNotFound({ item: "Route" }));

module.exports = todoRoute;
