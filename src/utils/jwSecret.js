const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const generateJwtSecret = () => {
  // Generate a random 32-byte (256-bit) string
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};
const jwtSecret = generateJwtSecret();

module.exports = {
  generateJwtSecret,
  jwtSecret,
};
