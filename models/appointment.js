const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient_id: { type: Schema.Types.ObjectId, ref: "patient" },
  doctor_id: { type: Schema.Types.ObjectId, ref: "doctor" },
  day: { type: String },
  startTime: { type: String },
  endTime: { type: String },
  duration: { type: Number },
});

module.exports = mongoose.model(
  "appointment",
  appointmentSchema,
  "appointment"
);
