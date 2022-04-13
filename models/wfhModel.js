const mongoose = require("mongoose");
const User = require("./userModel");

const wfhSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    fromDate: { type: Date },
    toDate: { type: Date },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "DENIED"],
      default: "PENDING",
    },
    assets: { type: String },
    ableToWork: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    approved: { type: Number },
    deniedReason: { type: String },
    connectivity: { type: String },
    fromTime: { type: Date, default: Date.now() },
    toTime: { type: Date, default: Date.now() },
    location: { type: String },
    reviewedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wfh = mongoose.model("Wfh", taskSchema);
module.exports = Wfh;
