const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["long", "short"],
    },
    catwayState: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Catway = mongoose.model("Catway", catwaySchema);

module.exports = Catway;
