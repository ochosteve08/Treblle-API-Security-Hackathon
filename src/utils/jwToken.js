const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./jwSecret");


const createToken = async (userId) =>
  jwt.sign(
    {
      _id: userId,
      issuer: "myapp",
      audience: "myapp",
      expiresIn: "100h",
    },
    jwtSecret
  );

const verifyToken = async (token) => await jwt.verify(token, jwtSecret);

module.exports = {
  createToken,
  verifyToken,
};
