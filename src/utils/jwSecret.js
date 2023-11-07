const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const generateJwtSecret = () => {
 
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};
const jwtSecret = generateJwtSecret();

module.exports = {
  generateJwtSecret,
  jwtSecret,
};
