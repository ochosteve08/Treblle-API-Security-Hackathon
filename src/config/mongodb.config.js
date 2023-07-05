const mongoose = require("mongoose");
const env = require("./env");
const connectToMongoDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URL, {
      useNewurlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error in connecting to mongodb", error);
    throw new Error(error);
  }
};

module.exports = {
  connectToMongoDb,
};
