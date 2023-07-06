const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      default: uuidv4,
    },
    
  },

  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("myUser", userSchema);
module.exports = UserModel;
