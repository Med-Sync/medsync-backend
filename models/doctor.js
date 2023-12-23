const mongoose = require("mongoose");
const { Schema } = mongoose;
const hospital = require("./hospital");

const timeSlotSchema = new mongoose.Schema({
  startTime: { type: String },
  endTime: { type: String },
});
const doctorSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email_id: { type: String },
  password: { type: String },
  specialization: { type: String, required: true },
  time_slot: { type: timeSlotSchema },
  hospitals: [
    {
      type: Schema.Types.ObjectId,
      ref: "hospital",
    },
  ],
  applied_to_hospitals: [{ type: Schema.Types.ObjectId, ref: "hospital" }],
  // location: {
  //   type: { type: String, enum: ["Point"] },
  //   coordinates: { type: [Number], required: true },
  // },
});

module.exports = mongoose.model("doctor", doctorSchema, "doctor");
