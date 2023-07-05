require("dotenv").config();

module.exports = {
  ENVIRONMENT: process.env.ENVIRONMENT || "ochosteve",
  APP_PORT: process.env.APP_PORT || "8080",
  APP_HOST: process.env.APP_HOST,
  MONGO_URL: process.env.MONGO_URL,
};
