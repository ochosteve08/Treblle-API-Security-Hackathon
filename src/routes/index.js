const express = require("express");
const { error } = require("../lib-handler");
const userRoute = require("./user.routes");
const todoRoute = require("./todo.routes");

const apiRoutes = express.Router();
apiRoutes.use("/users", userRoute);
apiRoutes.use("/todos", todoRoute);
apiRoutes.use("*", () => error.throwNotFound({ item: "Route" }));

module.exports = apiRoutes;
