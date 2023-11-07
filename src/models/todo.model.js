const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    _id: {
      type: String,
      default: uuidv4,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserRef",
    },
  },

  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("todo", todoSchema);
module.exports = todoModel;
