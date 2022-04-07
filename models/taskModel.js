const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    taskCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    numberOfDays: { type: Number },
    duration: [
      {
        dates: { type: Date },
        timeTaken: { type: Number },
      },
    ],
    billableHours: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
