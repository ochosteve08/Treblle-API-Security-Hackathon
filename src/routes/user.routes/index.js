const express = require("express");
const userRoutes = require("./user.routes");
const { error } = require("../../lib-handler");

const userRoute = express.Router();

userRoute.use(userRoutes);
userRoute.use("*", () => error.throwNotFound({ item: "Route" }));

module.exports = userRoute;
