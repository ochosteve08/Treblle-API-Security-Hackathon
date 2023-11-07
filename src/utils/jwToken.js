const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./jwSecret");


const createToken = async (userId) =>
  jwt.sign(
    {
      _id: userId,
      expiresIn: "30m",
    },
    jwtSecret
  );

const verifyToken = async (token) => await jwt.verify(token, jwtSecret);

module.exports = {
  createToken,
  verifyToken,
};
