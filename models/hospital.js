const mongoose = require("mongoose");
const { Schema } = mongoose;
const doctor = require("../models/doctor");

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String },
  email_id: { type: String, unique: true },
  password: { type: String },
  doctors: [
    {
      type: Schema.Types.ObjectId,
      ref: "doctor",
    },
  ],
  applied_doctors: [{ type: Schema.Types.ObjectId, ref: "doctor" }],
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number], required: true },
  },
});

hospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("hospital", hospitalSchema, "hospital");
