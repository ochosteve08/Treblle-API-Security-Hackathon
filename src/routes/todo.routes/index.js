const express = require("express");
const todoRoutes = require("./todo.route");
const {  error } = require("../../lib-handler");

const todoRoute = express.Router();

todoRoute.use(todoRoutes);
todoRoute.use("*", () => error.throwNotFound({ item: "Route" }));

module.exports = todoRoute;
