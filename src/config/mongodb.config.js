const mongoose = require("mongoose");
const env = require("./env");
const connectToMongoDb = async () => {
  try {
    // console.log('running')
    await mongoose.connect(env.MONGO_URL, {
      useNewurlParser: true,
      useUnifiedTopology: true,
    }); 
    console.log('connected')
  } catch (error) {
    console.log("Error in connecting to mongodb", error);
    throw new Error(error);
  }
};

module.exports = {
  connectToMongoDb,
};
