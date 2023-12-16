const mongoose = require("mongoose");

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
  token: { type: String },
});

module.exports = mongoose.model("doctor", doctorSchema, "doctor");
