const mongoose = require("mongoose");
const { Schema } = mongoose;
const hospital = require("./hospital");

const timeSlotSchema = new mongoose.Schema({
  day: { type: String },
  startTime: { type: String },
  endTime: { type: String },
});

const scheduledAppointmentSchema = new mongoose.Schema({
  patient_id: { type: Schema.Types.ObjectId, ref: "patient" },
  dateTime: { type: Date },
  duration: { type: Number },
});

const doctorSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email_id: { type: String },
  password: { type: String },
  specialization: { type: String, required: true },
  availability: [{ type: timeSlotSchema }],
  scheduledAppointments: [{ type: scheduledAppointmentSchema }],
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
