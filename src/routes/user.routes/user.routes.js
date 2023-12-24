const express = require("express");
const { userController } = require("../../controllers");
const {loginLimiter} = require("../../middleWare/loginLimiter");

const userRoutes = express.Router();

userRoutes.post("/register", userController.registerUser);
userRoutes.post("/login", loginLimiter, userController.userLogin);

module.exports = userRoutes;
