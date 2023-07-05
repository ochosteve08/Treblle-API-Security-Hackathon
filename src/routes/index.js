const express = require("express");

const userRoute = require("./user.routes");
const todoRoute = require("./todo.routes");

const apiRoutes = express.Router();
apiRoutes.use("/user", userRoute);
apiRoutes.use("/todo", todoRoute);
// apiRoutes.use("*", () => error.throwNotFound({ item: "Route" }));

module.exports = apiRoutes;
