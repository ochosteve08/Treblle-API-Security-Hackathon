const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

    userId: {
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
