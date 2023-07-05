const mongoose = require("mongoose");

const startSession = async () => mongoose.startSession();

module.exports = {
  startSession,
};
